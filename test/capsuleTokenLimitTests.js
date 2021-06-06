const { expect } = require("chai");
const { network } = require("hardhat");
const { BigNumber } = require("@ethersproject/bignumber");

const BASE = BigNumber.from(1).pow(18);

let capsuleContract;
let wallet;
let tokens = [];
let testCapsule;

const dateToUnix = (date) => {
  return Math.round(date.getTime() / 1000);
};

const createToken = async (index) => {
  const Token = await ethers.getContractFactory("TestERC20");
  token = await Token.deploy();
  token.__ERC20_init("token" + index, "token" + index);
  token.mint(wallet.address, BASE.mul(10));
  tokens.push(token);
};

const createValues = (tokenCount) => {
  const values = [];
  for (let index = 0; index < tokenCount; index++) {
    values.push(BASE);
  }
  return values;
};

const createCapsule = async (tokenCount) => {
  const now = new Date();
  const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
  const distributionDate = dateToUnix(nextMonth);

  for (let index = 0; index < tokenCount; index++) {
    await tokens[index].approve(capsuleContract.address, BASE);
  }
  await capsuleContract.createCapsule(
    wallet.address,
    distributionDate,
    1,
    1,
    tokens.slice(0, tokenCount).map((t) => t.address),
    createValues(tokenCount),
    true
  );

  const capsuleCount = await capsuleContract.getCapsuleCount();
  testCapsule = await capsuleContract.getCapsule(capsuleCount - 1);
};

describe("Asset Limit Tests", () => {
  before(async () => {
    let signers = await ethers.getSigners();
    wallet = signers[0];

    for (let index = 0; index < 13; index++) {
      await createToken(index);
    }

    const Capsule = await ethers.getContractFactory("CryptoCapsule");
    capsuleContract = await Capsule.deploy();
  });

  it("Should create Capsule with 9 tokens", async () => {
    await createCapsule(9);
  });

  it("Should create Capsule with 10 tokens", async () => {
    await createCapsule(10);
  });

  it("Should fail to create capsule with 11 tokens", async () => {
    await expect(createCapsule(11)).to.be.revertedWith(
      "Assets exceed maximum of 10 per capsule"
    );
  });

  it("Should fail to create capsule with 13 tokens", async () => {
    await expect(createCapsule(13)).to.be.revertedWith(
      "Assets exceed maximum of 10 per capsule"
    );
  });

  it("Should create Capsule with 9 tokens", async () => {
    await createCapsule(1);
  });

  it("Should allow adding 10th new token", async () => {
    await tokens[9].approve(capsuleContract.address, BASE);
    await capsuleContract.addAssets(
      testCapsule.id,
      [tokens[9].address],
      [BASE]
    );
    testCapsule = await capsuleContract.getCapsule(testCapsule.id);
  });

  it("Should allow adding 10 existing tokens", async () => {
    for (let index = 0; index < 10; index++) {
      await tokens[index].approve(capsuleContract.address, BASE);
    }
    await capsuleContract.addAssets(
      testCapsule.id,
      tokens.slice(0, 10).map((t) => t.address),
      createValues(10)
    );
    testCapsule = await capsuleContract.getCapsule(testCapsule.id);
  });

  it("Should failing adding 11th new token", async () => {
    await tokens[10].approve(capsuleContract.address, BASE);

    await expect(
      capsuleContract.addAssets(testCapsule.id, [tokens[10].address], [BASE])
    ).to.be.revertedWith("Assets exceed maximum of 10 per capsule");
  });

  it("Should failing adding 11th new token with existing", async () => {
    for (let index = 0; index < 11; index++) {
      await tokens[index].approve(capsuleContract.address, BASE);
    }
    await expect(
      capsuleContract.addAssets(
        testCapsule.id,
        tokens.slice(0, 11).map((t) => t.address),
        createValues(11)
      )
    ).to.be.revertedWith("Assets exceed maximum of 10 per capsule");
  });
});
