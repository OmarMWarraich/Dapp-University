const DappUniversityToken = artifacts.require("DappUniversityToken");

module.exports = function(deployer) {
  deployer.deploy(DappUniversityToken);
};
