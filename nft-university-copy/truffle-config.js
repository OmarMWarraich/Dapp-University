require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
let privateKeys = process.env.PRIVATE_KEYS || ""
privateKeys = privateKeys.split(',')  // Array of account private keys

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys,
          `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      gas: 5000000,
      // gasPrice: 50000000000, // "Instant" setting
      // gasPrice: 25000000000, // "Fast" setting
      gasPrice: 1000000000, // "Money Saver" setting
      network_id: 1
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys,
          `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      gas: 5000000,
      // gasPrice: 50000000000, // "Instant" setting
      // gasPrice: 25000000000, // "Fast" setting
      gasPrice: 1000000000, // "Money Saver" setting
      confirmations: 1,
      network_id: 42
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
