require('babel-register');
require('babel-polyfill');
require('dotenv').config();
//const HDWalletProvider = require('@truffle/hdwallet-provider');
//let privateKey = process.env.PRIVATE_KEYS || ""
// privateKey = Buffer.from(privateKey, 'hex').toString()

module.exports = {
  networks: {
    ganache_gui: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ganache_cli: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
  },
  test_directory: './src/backEnd/test_evm/',
  contracts_directory: './src/backEnd/contracts_evm/',
  contracts_build_directory: './src/backEnd/abis_evm/',
  migrations_directory: './src/backEnd/migrations_evm/',
  compilers: {
    solc: {
      version: ">=0.6.0 <0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}

