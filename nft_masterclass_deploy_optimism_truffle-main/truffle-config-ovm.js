require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonicOptimism = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"

module.exports = {
  networks: {
    optimistic_local: {
      network_id: 420,
      gas:  15000000,
      networkCheckTimeout: 10000,
      skipDryRun: true,
      provider: function() {
        return new HDWalletProvider({
          mnemonic: {
            phrase: mnemonicOptimism
          },
          providerOrUrl: "http://127.0.0.1:8545/",
          addressIndex: 0,
          chainId: 420
        })
      }
    },
    optimistic_kovan: {
      networkCheckTimeout: 10000,
      network_id: 69,
      gas:  105070000,
      gasPrice: 15000000,
      skipDryRun: true,
      provider: function() {
        return new HDWalletProvider(process.env.mnemonicPhrase, "https://optimism-kovan.infura.io/v3/"+ process.env.infuraID, 0, 1);
      }
    },
    optimistic_mainnet: {
      networkCheckTimeout: 10000,
      network_id: 10,
      gas:  105070000,
      gasPrice: 15000000,
      skipDryRun: true,
      provider: function() {
        return new HDWalletProvider(process.env.mnemonicPhrase, "https://optimism-mainnet.infura.io/v3/" + process.env.infuraID, 0, 1);
      }
    }
  },
  contracts_directory: './src/backEnd/contracts_ovm/',
  contracts_build_directory: './src/backEnd/abis_ovm/',
  migrations_directory: './src/backEnd/migrations_ovm/',
  test_directory: './src/backEnd/test_ovm/',
  compilers: {
    solc: {
      // Add path to the optimism solc fork
      version: './node_modules/@eth-optimism/solc',
      settings: {
        optimizer: {
          enabled: true,
          runs: 1
        },
      }
    }
  }
}
