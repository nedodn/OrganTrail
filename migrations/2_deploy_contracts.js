var Organ = artifacts.require("./Organ.sol");

module.exports = function(deployer) {
  deployer.deploy(Organ);
};
