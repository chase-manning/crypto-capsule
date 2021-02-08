var CapsuleFactory = artifacts.require("./CapsuleFactory.sol");

module.exports = function (deployer) {
  deployer.deploy(CapsuleFactory);
};
