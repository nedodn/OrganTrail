var Organ = artifacts.require("./contracts/Organ.sol");

module.exports = function(deployer) {
  deployer.deploy(Organ);
};
