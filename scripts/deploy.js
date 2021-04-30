const hre = require("hardhat");

const ethOracle = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e";
const oracles = [
  {
    token: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735",
    value: "0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF",
  },
];

async function main() {
  const Capsule = await hre.ethers.getContractFactory("CryptoCapsule");
  const capsule = await Capsule.deploy(
    oracles.map((o) => o.token),
    oracles.map((o) => o.value),
    ethOracle
  );
  await capsule.deployed();
  console.log("Capsule deployed to:", capsule.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
