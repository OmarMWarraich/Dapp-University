# Truffle Mint Dai

[![Actions Status](https://github.com/ryanio/truffle-mint-dai/workflows/Build/badge.svg)](https://github.com/ryanio/truffle-mint-dai/actions)

This repo is a [Truffle](https://www.trufflesuite.com) project as an accompanying supplement to the article [Forking Ethereum Mainnet: Mint Your Own DAI](https://medium.com/ethereum-grid/forking-mainnet-for-an-easy-local-ethereum-developer-environment-d8b62a82b3f7).

This repo contains a test suite that shows you how you can acquire your own DAI on a forked mainnet.

First run `yarn` and then set up your environment variables by running:

`export ETHEREUM_NODE=https://mainnet.infura.io/v3/your_project_id`
e.g `export ETHEREUM_NODE=https://mainnet.infura.io/v3/111111111111111111111111 `
where 111111111111111111111111 is your infura project id. 

(If using geth, `ETHEREUM_NODE` may look like: `http://localhost:8545`)

and

`export USER_ADDRESS=$(yarn --silent getAddress)`

Do not close this terminal, its the same terminal you must run yarn test to acces the env variables
Then run in a seperate terminal and leaving running:

`yarn ganache`

Copy first address private key and import into Metamask

#### Tests

After your forked mainnet with ganache running in a separate terminal; run:

`yarn test`

You should expect output like below:

![Sample Test Output](https://i.imgur.com/JGWzr78.png)
