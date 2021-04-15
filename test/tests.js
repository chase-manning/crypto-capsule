const { expect } = require("chai");

describe("Capsule Factory", () => {
  it("Should successfully deply", async () => {
    const Factory = await ethers.getContractFactory("CapsuleFactory");
    const factory = await Factory.deploy();
    await factory.deployed();
  });
});
