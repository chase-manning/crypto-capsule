const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");

const ethOracle = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e";
const oracles = [
  {
    token: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735",
    value: "0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF",
  },
];

const SENDER_ADDRESS = "0x07d48BDBA7975f0DAF73BD5b85A2E3Ff87ffb24e";
const RECEIVER_ADDRESS = "0xd83BbB419B928bB8066847f6c66eA453Fb062C7f";

describe("Capsule", () => {
  it("Should successfully deply", async () => {
    const Capsule = await ethers.getContractFactory("CryptoCapsule");
    const capsule = await Capsule.deploy(
      oracles.map((o) => o.token),
      oracles.map((o) => o.value),
      ethOracle
    );
    await capsule.deployed();
  });

  it("Should have no Capsules on Creation", async () => {
    const Capsule = await ethers.getContractFactory("CryptoCapsule");
    const capsule = await Capsule.deploy(
      oracles.map((o) => o.token),
      oracles.map((o) => o.value),
      ethOracle
    );
    await capsule.deployed();

    const sent = await capsule.getSentCapsules(SENDER_ADDRESS);
    expect(sent.length).to.equal(0);

    const received = await capsule.getSentCapsules(RECEIVER_ADDRESS);
    expect(received.length).to.equal(0);
  });

  it("Should Create Capsule", async () => {
    const Capsule = await ethers.getContractFactory("CryptoCapsule");
    const capsule = await Capsule.deploy(
      oracles.map((o) => o.token),
      oracles.map((o) => o.value),
      ethOracle
    );
    await capsule.deployed();

    // await capsule.createCapsule(
    //   RECEIVER_ADDRESS,
    //   new Date().getTime(),
    //   ["0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735"],
    //   ["1000000000"]
    // );

    // const capsuleMeow = await capsule.getCapsule(0);
    // const sent = await capsule.getSentCapsules(SENDER_ADDRESS);
    // const received = await capsule.getReceivedCapsules(RECEIVER_ADDRESS);
  });
});
