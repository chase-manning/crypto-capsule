const hre = require("hardhat");

async function main() {
  const Capsule = await hre.ethers.getContractFactory("CryptoCapsule");
  const capsule = await Capsule.deploy();
  await capsule.deployed();
  console.log("Capsule deployed to:", capsule.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
