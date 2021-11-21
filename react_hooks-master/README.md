# Simple Storage
A simple full stack application showcasing the use of functional based components / react hooks.

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
### 1. Clone the Repository:
`$ git clone https://github.com/dappuniversity/react_hooks.git`

### 2. Install Dependencies:
```
$ cd react_hooks
$ yarn install 
```

### 3. Start Ganache
Create a new workspace, and copy the private key of one of the provided accounts.

### 4. Configure MetaMask ​
After installing MetaMask and going through the initial setup. Import the private key you copied from Ganache. Finally, make sure you are on the correct network, you can go to your MetaMask settings -> networks. From there you can add a new network or edit the existing localhost settings to match the settings in Ganache.

### 4. Migrate Smart Contracts
`$ truffle migrate --reset`

### 5. Run Frontend Application
`$ yarn start`
