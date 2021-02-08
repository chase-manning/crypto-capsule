var Capsule = artifacts.require("./Capsule.sol");
var CapsuleFactory = artifacts.require("./CapsuleFactory.sol");

module.exports = function (deployer) {
  deployer.deploy(Capsule);
  deployer.deploy(CapsuleFactory);
};
