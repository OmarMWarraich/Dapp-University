# Simple Storage w/ useDApp
A simple full stack application showcasing useDApp.

## Technology Stack & Tools
- Solidity (Writing Smart Contract)
- Javascript (React)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started) (Package Manager)
- [Web3](https://web3js.readthedocs.io/en/v1.5.2/) (Blockchain Interaction)
- [Truffle](https://www.trufflesuite.com/docs/truffle/overview) (Development Framework)
- [Ganache](https://www.trufflesuite.com/ganache) (For Local Blockchain)
- [MetaMask](https://metamask.io/) (Ethereum Wallet)

## Requirements
- Install [MetaMask](https://metamask.io/) in your browser.
- Download & Install [Ganache](https://www.trufflesuite.com/ganache).
- Install [Node.js](https://nodejs.org/en/)
  1. You can check to see if Node is installed by using `node --version` in your command line.
- Install [Yarn](https://yarnpkg.com/getting-started).
  1. You can check to see if Yarn is installed by using `yarn --version` in your command line.
  2. If not installed, you can install using: `npm install -g yarn` 


## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
`$ yarn install `

### 3. Start Ganache
Create a new workspace, and copy the private key of one of the provided accounts.

### 4. Configure MetaMask ​
After installing MetaMask and going through the initial setup. Import the private key you copied from Ganache. Finally, make sure you are on the correct localhost network, alternatively, you may also interact with the app while connected to Kovan.

### 4. Migrate Smart Contracts
`$ truffle migrate --reset`

### 5. Run Frontend Application
`$ yarn start`

## Extra Notes
- SimpleStorage contract is deployed to Kovan, best to interact with the app while connected to the Kovan Network, due to Ether balances not seeming to appear correctly, and to properly showoff useNotification hook.
- If interacting with localhost, it will prompt you to confirm a MetaMask transaction to deploy a multicall contract, this is normal behavior according to useDApp's documentation. More details can be found [here](https://usedapp.readthedocs.io/en/latest/core.html#localmulticallprovider)