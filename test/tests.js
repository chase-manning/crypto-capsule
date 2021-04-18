const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");

const SENDER_ADDRESS = "0x07d48BDBA7975f0DAF73BD5b85A2E3Ff87ffb24e";
const RECEIVER_ADDRESS = "0xd83BbB419B928bB8066847f6c66eA453Fb062C7f";

describe("Capsule", () => {
  it("Should successfully deply", async () => {
    const Capsule = await ethers.getContractFactory("CryptoCapsule");
    const capsule = await Capsule.deploy();
    await capsule.deployed();
  });

  it("Should have no Capsules on Creation", async () => {
    const Capsule = await ethers.getContractFactory("CryptoCapsule");
    const capsule = await Capsule.deploy();
    await capsule.deployed();

    const sent = await capsule.getSentCapsules(SENDER_ADDRESS);
    expect(sent.length).to.equal(0);

    const received = await capsule.getSentCapsules(RECEIVER_ADDRESS);
    expect(received.length).to.equal(0);
  });

  it("Should Create Capsule", async () => {
    const Capsule = await ethers.getContractFactory("CryptoCapsule");
    const capsule = await Capsule.deploy();
    await capsule.deployed();

    await capsule.createCapsule(RECEIVER_ADDRESS, new Date().getTime(), [], []);

    const capsuleMeow = await capsule.getCapsule(0);
    console.log(capsuleMeow);

    const sent = await capsule.getSentCapsules(SENDER_ADDRESS);
    console.log(sent);

    const received = await capsule.getReceivedCapsules(RECEIVER_ADDRESS);
    console.log(received);
  });
});
