const hre = require("hardhat");

async function main() {
  const CapsuleFactory = await hre.ethers.getContractFactory("CapsuleFactory");
  const capsuleFactory = await CapsuleFactory.deploy();
  await capsuleFactory.deployed();
  console.log("Capsule Factory deployed to:", capsuleFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
