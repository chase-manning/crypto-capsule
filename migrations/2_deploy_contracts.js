var Capsule = artifacts.require("./Capsule.sol");
var CapsuleFactory = artifacts.require("./CapsuleFactory.sol");

export default function (deployer) {
  deployer.deploy(Capsule);
  deployer.deploy(CapsuleFactory);
}
