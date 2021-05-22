const { expect } = require("chai");
const { network } = require("hardhat");
const { BigNumber } = require("@ethersproject/bignumber");

const BASE = BigNumber.from(10).pow(18);
const REWARD_DURATION = 60 * 60 * 24 * 356 * 4;
const REWARD_RATE = BASE.mul(7_000_000).div(REWARD_DURATION);

let capsuleContract;
let capsuleCoin;
let walletA, walletB, walletC;
let tokenA, tokenB, tokenC;
let testCapsule;

const dateToUnix = (date) => {
  return Math.round(date.getTime() / 1000);
};

describe("Capsule", () => {
  before(async () => {
    let signers = await ethers.getSigners();
    walletA = signers[0];
    walletB = signers[1];
    walletC = signers[2];

    const OracleEth = await ethers.getContractFactory("Oracle");
    const oracleEth = await OracleEth.deploy();
    const oracleA = await OracleEth.deploy();
    const oracleB = await OracleEth.deploy();

    const CapsuleCoin = await ethers.getContractFactory("CapsuleCoin");
    capsuleCoin = await CapsuleCoin.deploy(walletA.address);

    const TokenA = await ethers.getContractFactory("TestERC20");
    tokenA = await TokenA.deploy();
    tokenA.__ERC20_init("tokena", "tokena");
    tokenA.mint(walletA.address, BASE.mul(10));

    const TokenB = await ethers.getContractFactory("TestERC20");
    tokenB = await TokenB.deploy();
    tokenB.__ERC20_init("tokenb", "tokenb");
    tokenB.mint(walletA.address, BASE.mul(10));

    const TokenC = await ethers.getContractFactory("TestERC20");
    tokenC = await TokenC.deploy();
    tokenC.__ERC20_init("tokenc", "tokenc");
    tokenC.mint(walletA.address, BASE.mul(10));

    const Capsule = await ethers.getContractFactory("CryptoCapsule");
    capsuleContract = await Capsule.deploy(
      [tokenA.address, tokenB.address],
      [oracleA.address, oracleB.address],
      oracleEth.address,
      capsuleCoin.address
    );

    await capsuleCoin.transfer(capsuleContract.address, BASE.mul(7_000_000));
  });

  it("Should have no Capsules on creation", async () => {
    const capsuleCount = await capsuleContract.getCapsuleCount();
    expect(capsuleCount).to.equal(0);

    await expect(capsuleContract.getCapsule(0)).to.be.revertedWith(
      "Capsule does not exist"
    );
  });

  it("Should create Capsule", async () => {
    const now = new Date();
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
    const distributionDate = dateToUnix(nextMonth);

    const balanceBefore = Number(await tokenA.balanceOf(walletA.address));

    await tokenA.approve(capsuleContract.address, BASE);
    await capsuleContract.createCapsule(
      walletB.address,
      distributionDate,
      1,
      1,
      [tokenA.address],
      [BASE]
    );

    const balanceAfter = Number(await tokenA.balanceOf(walletA.address));
    expect(balanceAfter).to.equal(balanceBefore - Number(BASE));

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
    expect(capsule.amounts[0]).to.equal(BASE);
    expect(capsule.tokens.length).to.equal(1);
    expect(capsule.amounts.length).to.equal(1);
  });

  it("Should have a reward rate set", async () => {
    const rewardRate = await capsuleContract.rewardRate();
    console.log(rewardRate);
    expect(rewardRate).to.equal(REWARD_RATE);
  });

  it("Should fail on distribution date in past", async () => {
    const now = new Date();
    const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
    const distributionDate = dateToUnix(lastMonth);

    await tokenA.approve(capsuleContract.address, BASE);

    await expect(
      capsuleContract.createCapsule(
        walletB.address,
        distributionDate,
        1,
        1,
        [tokenA.address],
        [BASE]
      )
    ).to.be.revertedWith("Distribution Date must be in future");
  });

  it("Should fail with no token value", async () => {
    const now = new Date();
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
    const distributionDate = dateToUnix(nextMonth);

    await tokenA.approve(capsuleContract.address, BASE);

    await expect(
      capsuleContract.createCapsule(
        walletB.address,
        distributionDate,
        1,
        1,
        [tokenA.address],
        [0]
      )
    ).to.be.revertedWith("Token value must be greater than 0");
  });

  it("Should fail on mismatched token and amount lengths", async () => {
    const now = new Date();
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
    const distributionDate = dateToUnix(nextMonth);

    await tokenA.approve(capsuleContract.address, BASE);

    await expect(
      capsuleContract.createCapsule(
        walletB.address,
        distributionDate,
        1,
        1,
        [tokenA.address, tokenB.address],
        [BASE]
      )
    ).to.be.revertedWith("Tokens and Values must be same length");

    await expect(
      capsuleContract.createCapsule(
        walletB.address,
        distributionDate,
        1,
        1,
        [tokenA.address],
        [BASE, BASE]
      )
    ).to.be.revertedWith("Tokens and Values must be same length");
  });

  it("Should fail on negative or 0 period size", async () => {
    const now = new Date();
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
    const distributionDate = dateToUnix(nextMonth);

    await tokenA.approve(capsuleContract.address, BASE);

    await expect(
      capsuleContract.createCapsule(
        walletB.address,
        distributionDate,
        0,
        1,
        [tokenA.address],
        [BASE]
      )
    ).to.be.revertedWith("Period Size must greater than or equal to 1");
  });

  it("Should fail on negative or 0 period count", async () => {
    const now = new Date();
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
    const distributionDate = dateToUnix(nextMonth);

    await tokenA.approve(capsuleContract.address, BASE);

    await expect(
      capsuleContract.createCapsule(
        walletB.address,
        distributionDate,
        1,
        0,
        [tokenA.address],
        [BASE]
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
      [BASE]
    );

    testCapsule = await capsuleContract.getCapsule(capsuleCount);

    await expect(
      capsuleContract.openCapsule(testCapsule.id)
    ).to.be.revertedWith("Capsule has not matured yet");
  });

  it("Should have no rewards before time passing", async () => {
    const rewards = await capsuleContract.getRewardsEarned(testCapsule.id);
    expect(rewards).to.equal(0);
  });

  it("Should pass the time 1 months", async () => {
    await network.provider.send("evm_increaseTime", [60 * 60 * 24 * 7 * 4 * 1]);
    await network.provider.send("evm_mine");
  });

  it("Should have rewards after time passing", async () => {
    const rewards = await capsuleContract.getRewardsEarned(testCapsule.id);
    expect(rewards).to.equal(REWARD_RATE.mul(60 * 60 * 24 * 7 * 4 * 1));
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

  it("Should throw error for invalid capsule for reward earned", async () => {});

  it("Should have 3 million Capsule Coins before opening", async () => {
    const expectedBalance = BASE.mul(3_000_000);
    const balance = await capsuleCoin.balanceOf(walletA.address);
    expect(balance).to.equal(expectedBalance);
  });

  it("Should open Capsule", async () => {
    const balanceBefore = Number(await tokenA.balanceOf(walletA.address));

    await capsuleContract.openCapsule(testCapsule.id);
    testCapsule = await capsuleContract.getCapsule(testCapsule.id);
    expect(testCapsule.opened).to.equal(true);

    const balanceAfter = Number(await tokenA.balanceOf(walletA.address));
    expect(balanceAfter).to.equal(balanceBefore + Number(BASE));
  });

  it("Should receive Capsule Coin rewards after opening", async () => {});

  // TODO rewards for split accounts
  // TODO rewards going to another address
  // TODO rewards for end of periods
  // TODO stop accululating after capsule end
  // TODO stops impacting total after capsule end

  it("Should not open already opened Capsule", async () => {
    await expect(
      capsuleContract.openCapsule(testCapsule.id)
    ).to.be.revertedWith("Capsule has already been opened");
  });

  it("Should create Staggered Capsule", async () => {
    const now = new Date();
    now.setMonth(now.getMonth() + 12);
    await network.provider.send("evm_setNextBlockTimestamp", [dateToUnix(now)]);
    const nextMonth = new Date(now.setDate(now.getDate() + 30));
    const distributionStartDate = dateToUnix(nextMonth);
    const periodSize = 60 * 60 * 24 * 7;

    const capsuleCount = await capsuleContract.getCapsuleCount();

    await tokenA.approve(capsuleContract.address, BASE);
    await capsuleContract.createCapsule(
      walletA.address,
      distributionStartDate,
      periodSize,
      5,
      [tokenA.address],
      [BASE]
    );

    testCapsule = await capsuleContract.getCapsule(capsuleCount);
    expect(testCapsule.periodSize).to.equal(periodSize);
    expect(testCapsule.periodCount).to.equal(5);
  });

  it("Should not open Staggered Capsule before Distribution Start Date", async () => {
    await expect(
      capsuleContract.openCapsule(testCapsule.id)
    ).to.be.revertedWith("Capsule has not matured yet");
  });

  it("Should pass 31 days", async () => {
    await network.provider.send("evm_increaseTime", [60 * 60 * 24 * 31]);
    await network.provider.send("evm_mine");
  });

  it("Should open Staggered Capsule", async () => {
    const balanceBefore = Number(await tokenA.balanceOf(walletA.address));
    await capsuleContract.openCapsule(testCapsule.id);
    const balanceAfter = Number(await tokenA.balanceOf(walletA.address));
    expect(balanceAfter).to.equal(balanceBefore + Math.trunc(Number(BASE) / 5));
  });

  it("Should require there are periods to claim to open", async () => {
    await expect(
      capsuleContract.openCapsule(testCapsule.id)
    ).to.be.revertedWith("No periods available to claim");
  });

  it("Should pass 8 days", async () => {
    await network.provider.send("evm_increaseTime", [60 * 60 * 24 * 8]);
    await network.provider.send("evm_mine");
  });

  it("Should open second portion of staggered capsule", async () => {
    const balanceBefore = Number(await tokenA.balanceOf(walletA.address));
    await capsuleContract.openCapsule(testCapsule.id);
    const balanceAfter = Number(await tokenA.balanceOf(walletA.address));
    expect(balanceAfter).to.equal(balanceBefore + Math.trunc(Number(BASE) / 5));
  });

  it("Should pass 15 days", async () => {
    await network.provider.send("evm_increaseTime", [60 * 60 * 24 * 15]);
    await network.provider.send("evm_mine");
  });

  it("Should open third and forth portion of staggered capsule", async () => {
    const balanceBefore = Number(await tokenA.balanceOf(walletA.address));
    await capsuleContract.openCapsule(testCapsule.id);
    const balanceAfter = Number(await tokenA.balanceOf(walletA.address));
    expect(balanceAfter).to.equal(
      balanceBefore + Math.trunc((Number(BASE) / 5) * 2)
    );
  });

  it("Should pass 8 days", async () => {
    await network.provider.send("evm_increaseTime", [60 * 60 * 24 * 8]);
    await network.provider.send("evm_mine");
  });

  it("Should open last portion of staggered capsule", async () => {
    const balanceBefore = Number(await tokenA.balanceOf(walletA.address));
    await capsuleContract.openCapsule(testCapsule.id);
    const balanceAfter = Number(await tokenA.balanceOf(walletA.address));
    expect(balanceAfter).to.equal(balanceBefore + Math.trunc(Number(BASE) / 5));
  });

  it("Should have opened status", async () => {
    testCapsule = await capsuleContract.getCapsule(testCapsule.id);
    expect(testCapsule.opened).to.be.true;
  });

  it("Should create multi token Capsule", async () => {
    const now = new Date();
    now.setMonth(now.getMonth() + 24);
    await network.provider.send("evm_setNextBlockTimestamp", [dateToUnix(now)]);
    const nextMonth = new Date(now.setDate(now.getDate() + 30));
    const distributionStartDate = dateToUnix(nextMonth);

    const capsuleCount = await capsuleContract.getCapsuleCount();

    await tokenA.approve(capsuleContract.address, BASE);
    await tokenB.approve(capsuleContract.address, BASE);
    await tokenC.approve(capsuleContract.address, BASE);
    await capsuleContract.createCapsule(
      walletA.address,
      distributionStartDate,
      1,
      1,
      [tokenA.address, tokenB.address, tokenC.address],
      [BASE, BASE, BASE],
      { value: ethers.utils.parseEther("1") }
    );

    testCapsule = await capsuleContract.getCapsule(capsuleCount);
    expect(testCapsule.tokens.length).to.equal(3);
    expect(testCapsule.amounts.length).to.equal(3);
  });

  it("Should get Capsule USD value", async () => {
    const usd = await capsuleContract.getUsdValue(testCapsule.id);
    expect(usd).to.equal(6);
  });

  it("Should get USD of multiple Capsules", async () => {
    const capsuleCount = await capsuleContract.getCapsuleCount();
    await tokenA.approve(capsuleContract.address, BASE);
    await capsuleContract.createCapsule(
      walletA.address,
      10 ** 10,
      1,
      1,
      [tokenA.address],
      [BASE],
      { value: ethers.utils.parseEther("1") }
    );

    const usd = await capsuleContract.getUsdValues([
      capsuleCount - 1,
      capsuleCount,
    ]);
    expect(usd[0]).to.equal(6);
    expect(usd[1]).to.equal(4);
  });

  it("Should get USD of multiple Capsules with just one Capsule", async () => {
    const usd = await capsuleContract.getUsdValues([testCapsule.id]);
    expect(usd[0]).to.equal(6);
  });

  it("Should add new Oracle", async () => {
    const NewOracleC = await ethers.getContractFactory("Oracle");
    const newOracleC = await NewOracleC.deploy();
    await capsuleContract.setOracle(tokenC.address, newOracleC.address);
  });

  it("Should get USD from new tokenOracle", async () => {
    const usd = await capsuleContract.getUsdValue(testCapsule.id);
    expect(usd).to.equal(8);
  });

  it("Should remove token Oracle", async () => {
    await capsuleContract.removeOracle(tokenC.address);
  });

  it("Should get USD without new token Oracle", async () => {
    const usd = await capsuleContract.getUsdValue(testCapsule.id);
    expect(usd).to.equal(6);
  });

  it("Should remove all token Oracles", async () => {
    await capsuleContract.removeOracle(tokenB.address);
    await capsuleContract.removeOracle(tokenA.address);
  });

  it("Should get USD with no token oracles", async () => {
    const usd = await capsuleContract.getUsdValue(testCapsule.id);
    expect(usd).to.equal(2);
  });

  it("Should change ETH Oracle", async () => {
    const NewEthOracle = await ethers.getContractFactory("Oracle");
    const newEthOracle = await NewEthOracle.deploy();
    await capsuleContract.setEthOracle(newEthOracle.address);
  });

  it("Should get USD with new ETH Oracle", async () => {
    const usd = await capsuleContract.getUsdValue(testCapsule.id);
    expect(usd).to.equal(2);
  });

  it("Should remove ETH Oracle", async () => {
    await capsuleContract.removeEthOracle();
  });

  it("Should get USD with no ETH Oracle", async () => {
    const usd = await capsuleContract.getUsdValue(testCapsule.id);
    expect(usd).to.equal(0);
  });
});
