const NFT = artifacts.require("NFT");
const Token = artifacts.require("Token");

module.exports = function(deployer, network) {
  if(network === 'optimistic_kovan' || network === 'optimistic_mainnet') {
    deployer.deploy(Token)
    .then(() => Token.deployed())
    .then(token => deployer.deploy(NFT, token.address))
  } else {
    deployer.deploy(Token, {gasPrice: 0})
    .then(() => Token.deployed())
    .then(token => deployer.deploy(NFT, token.address, {gasPrice: 0}))

  }

}