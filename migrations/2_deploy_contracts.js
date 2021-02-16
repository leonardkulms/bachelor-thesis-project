var AvoToken = artifacts.require("AvoToken");

module.exports = function(deployer) {
  // Arguments are: contract, initialSupply
  deployer.deploy(AvoToken, 1000);
};
