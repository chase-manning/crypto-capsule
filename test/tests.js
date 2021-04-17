const { expect } = require("chai");

describe("Capsule", () => {
  it("Should successfully deply", async () => {
    const Capsule = await ethers.getContractFactory("CryptoCapsule");
    const capsule = await Capsule.deploy();
    await capsule.deployed();
  });
});
