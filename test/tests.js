const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");
const { network } = require("hardhat");

const ethOracle = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e";
const oracles = [
  {
    token: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735",
    value: "0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF",
  },
];

const BASE = BigNumber.from(10).pow(18);
const balance = BASE.mul(1000000);
const amount = "1000000000";

let capsuleContract;
let walletA, walletB, walletC;
let tokenA, tokenB;
let testCapsule;

const dateToUnix = (date) => {
  return Math.round(date.getTime() / 1000);
};

const unixToDate = (unix) => {
  return new Date(unix * 1000);
};

describe("Capsule", () => {
  before(async () => {
    let signers = await ethers.getSigners();
    walletA = signers[0];
    walletB = signers[1];
    walletC = signers[2];

    const Capsule = await ethers.getContractFactory("CryptoCapsule");
    capsuleContract = await Capsule.deploy(
      oracles.map((o) => o.token),
      oracles.map((o) => o.value),
      ethOracle
    );

    const TokenA = await ethers.getContractFactory("TestERC20");
    tokenA = await TokenA.deploy();
    tokenA.__ERC20_init("tokena", "tokena");
    tokenA.mint(walletA.address, "10000000000");

    const TokenB = await ethers.getContractFactory("TestERC20");
    tokenB = await TokenB.deploy();
    tokenB.__ERC20_init("tokenb", "tokenb");
    tokenB.mint(walletB.address, "10000000000");
  });

  it("Should have no Capsules on creation", async () => {
    const capsuleCount = await capsuleContract.getCapsuleCount();
    expect(capsuleCount).to.equal(0);

    await expect(capsuleContract.getCapsule(0)).to.be.revertedWith(
      "Capsule does not exist"
    );
  });

  it("Should create Capsule", async () => {
    // TODO Add variation with ETH
    const now = new Date();
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
    const distributionDate = dateToUnix(nextMonth);

    const balanceBefore = Number(await tokenA.balanceOf(walletA.address));

    await tokenA.approve(capsuleContract.address, amount);
    await capsuleContract.createCapsule(
      walletB.address,
      distributionDate,
      1,
      1,
      [tokenA.address],
      [amount]
    );

    const balanceAfter = Number(await tokenA.balanceOf(walletA.address));
    expect(balanceAfter).to.equal(balanceBefore - Number(amount));

    const sentA = await capsuleContract.getSentCapsules(walletA.address);
    expect(sentA.length).to.equal(1);
    const recA = await capsuleContract.getReceivedCapsules(walletA.address);
    expect(recA.length).to.equal(0);
    const sentB = await capsuleContract.getSentCapsules(walletB.address);
    expect(sentB.length).to.equal(0);
    const recB = await capsuleContract.getReceivedCapsules(walletB.address);
    expect(recB.length).to.equal(1);

    const capsule = await capsuleContract.getCapsule(0);
    expect(capsule.id).to.equal(0);
    expect(capsule.grantor).to.equal(walletA.address);
    expect(capsule.beneficiary).to.equal(walletB.address);
    expect(capsule.distributionDate).to.equal(distributionDate);
    expect(capsule.periodSize).to.equal(1);
    expect(capsule.periodCount).to.equal(1);
    expect(capsule.claimedPeriods).to.equal(0);
    expect(capsule.opened).to.equal(false);
    expect(capsule.value).to.equal(0);
    expect(capsule.tokens[0]).to.equal(tokenA.address);
    expect(capsule.amounts[0]).to.equal(amount);
    expect(capsule.tokens.length).to.equal(1);
    expect(capsule.amounts.length).to.equal(1);
  });

  it("Should fail on distribution date in past", async () => {
    const now = new Date();
    const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
    const distributionDate = dateToUnix(lastMonth);

    await tokenA.approve(capsuleContract.address, amount);

    await expect(
      capsuleContract.createCapsule(
        walletB.address,
        distributionDate,
        1,
        1,
        [tokenA.address],
        [amount]
      )
    ).to.be.revertedWith("Distribution Date must be in future");
  });

  it("Should fail on mismatched token and amount lengths", async () => {
    const now = new Date();
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
    const distributionDate = dateToUnix(nextMonth);

    await tokenA.approve(capsuleContract.address, amount);

    await expect(
      capsuleContract.createCapsule(
        walletB.address,
        distributionDate,
        1,
        1,
        [tokenA.address, tokenB.address],
        [amount]
      )
    ).to.be.revertedWith("Tokens and Values must be same length");

    await expect(
      capsuleContract.createCapsule(
        walletB.address,
        distributionDate,
        1,
        1,
        [tokenA.address],
        [amount, amount]
      )
    ).to.be.revertedWith("Tokens and Values must be same length");
  });

  it("Should fail on negative or 0 period size", async () => {
    const now = new Date();
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
    const distributionDate = dateToUnix(nextMonth);

    await tokenA.approve(capsuleContract.address, amount);

    await expect(
      capsuleContract.createCapsule(
        walletB.address,
        distributionDate,
        0,
        1,
        [tokenA.address],
        [amount]
      )
    ).to.be.revertedWith("Period Size must greater than or equal to 1");
  });

  it("Should fail on negative or 0 period count", async () => {
    const now = new Date();
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
    const distributionDate = dateToUnix(nextMonth);

    await tokenA.approve(capsuleContract.address, amount);

    await expect(
      capsuleContract.createCapsule(
        walletB.address,
        distributionDate,
        1,
        0,
        [tokenA.address],
        [amount]
      )
    ).to.be.revertedWith("Period Count must greater than or equal to 1");
  });

  it("Should not open for non-beneficiary", async () => {
    await expect(capsuleContract.openCapsule(0)).to.be.revertedWith(
      "You are not the beneficiary of this Capsule"
    );
  });

  it("Should not open before distribution date", async () => {
    const now = new Date();
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
    const distributionDate = dateToUnix(nextMonth);

    const capsuleCount = await capsuleContract.getCapsuleCount();

    await capsuleContract.createCapsule(
      walletA.address,
      distributionDate,
      1,
      1,
      [tokenA.address],
      [amount]
    );

    testCapsule = await capsuleContract.getCapsule(capsuleCount);

    await expect(
      capsuleContract.openCapsule(testCapsule.id)
    ).to.be.revertedWith("Capsule has not matured yet");
  });

  it("Should pass the time 1 months", async () => {
    await network.provider.send("evm_increaseTime", [60 * 60 * 24 * 7 * 4 * 1]);
    await network.provider.send("evm_mine");
  });

  it("Should not open before distribution date", async () => {
    await expect(
      capsuleContract.openCapsule(testCapsule.id)
    ).to.be.revertedWith("Capsule has not matured yet");
  });

  it("Should pass the time past 2 months", async () => {
    await network.provider.send("evm_increaseTime", [60 * 60 * 24 * 7 * 4 * 2]);
    await network.provider.send("evm_mine");
  });

  it("Should open Capsule", async () => {
    const balanceBefore = Number(await tokenA.balanceOf(walletA.address));

    await capsuleContract.openCapsule(testCapsule.id);
    testCapsule = await capsuleContract.getCapsule(testCapsule.id);
    expect(testCapsule.opened).to.equal(true);

    const balanceAfter = Number(await tokenA.balanceOf(walletA.address));
    expect(balanceAfter).to.equal(balanceBefore + Number(amount));
  });

  it("Should not open already opened Capsule", async () => {
    await expect(
      capsuleContract.openCapsule(testCapsule.id)
    ).to.be.revertedWith("Capsule has already been opened");
  });

  it("Should create Staggered Capsule", async () => {
    // TODO Should check amounts
    const now = new Date();
    now.setMonth(now.getMonth() + 12);
    await network.provider.send("evm_setNextBlockTimestamp", [dateToUnix(now)]);
    const nextMonth = new Date(now.setDate(now.getDate() + 30));
    const distributionStartDate = dateToUnix(nextMonth);
    const periodSize = 60 * 60 * 24;

    const capsuleCount = await capsuleContract.getCapsuleCount();

    await tokenA.approve(capsuleContract.address, amount);
    await capsuleContract.createCapsule(
      walletA.address,
      distributionStartDate,
      periodSize,
      3,
      [tokenA.address],
      [amount]
    );

    testCapsule = await capsuleContract.getCapsule(capsuleCount);
    expect(testCapsule.periodSize).to.equal(periodSize);
    expect(testCapsule.periodCount).to.equal(3);
  });

  it("Should not open Staggered Capsule before Distribution Start Date", async () => {
    await expect(
      capsuleContract.openCapsule(testCapsule.id)
    ).to.be.revertedWith("Capsule has not matured yet");
  });
});
