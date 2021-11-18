# NFT Collectibles Masterclass project deployed on Ethereum networks 

### About
Dapp University NFT Collectibles Masterclass project deployed to Ethereum networks  

### Technology Stack and Tools

* [Node Version Manager](https://heynode.com/tutorial/install-nodejs-locally-nvm) - node version manager
* [ERC721](https://docs.openzeppelin.com/contracts/3.x/erc721) - ERC721 Token standard (NFTs)
* [Metamask Wallet](https://metamask.io/) - Metamask Wallet
* [Yarn](https://yarnpkg.com/) - Alternative package manager to NPM 
* [Truffle](https://www.trufflesuite.com/) - development framework
* [React](https://reactjs.org/) - front end framework
* [Redux](https://redux.js.org/) - state management framework for React
* [Solidity](https://docs.soliditylang.org/en/v0.7.4/) - ethereum smart contract language
* [Ganache](https://www.trufflesuite.com/ganache) - local blockchain development
* [Web3](https://web3js.readthedocs.io/en/v1.3.0/) - library interact with ethereum nodes 
* [JavaScript](https://www.javascript.com/) - logic front end and testing smart contracts
* [Infura](https://infura.io/) - connection to ethereum networks 
* [Open Zeppelin](https://infura.io/) - smart contract libraries 
* [IPFS](https://ipfs.io/) - peer to peer hypermedia protocol
* [IPFS HTTP ](https://www.npmjs.com/package/ipfs-http-client) - JavaScript HTTP client library for IPFS implementations

##### Folder / Directory Structure (key folders)
* NFT Collectibles Masterclass
  * node_modules
  * public 
    * index.html
  * src
    * backEnd
        * abis
        * contracts
        * migrations
        * scripts
        * test
    * components
    * images
    * store
    * index.js
    * .env
    * .env.example
    * truffle-config.js
    * yarn.lock

### Preconfiguration, Installation and Running project locally 

1. You will need nvm to install specific version node version 14 and above 
```sh
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
$ source ~/.nvm/nvm.sh
```
Restart your terminal

2. Install node v14.16.0 
```sh
$ nvm install 14.16.0 
$ nvm alias default 14.16.0 
$ nvm use default
```

3. Install truffle globally if not installed. 
Check if installed using 
```sh
truffle version
```
If not installed install with below 
```sh
$ npm install -g truffle
```

4. If opting to use ganache-cli vs [Ganache GUI](https://www.trufflesuite.com/ganache), install ganache-cli globally. Note that ganache-cli rus on port 8545 and ganache-gui runs on port 7545 as placced in truffle-config.js. Check if ganache-cli installed first with
```sh
ganache-cli --version
```
If not installed install with below
```sh
$ npm install -g ganache-cli
$ ganache-cli
```
Run ganache-cli in different terminal and keep running when compiling,testing, migrating, running app etc

5. Install and Run IPFS. Check if ipfs is not installed first with 
```sh
jsipfs version
```
If not installed install with below
   Install IPFS and run it:
```sh
$ npm i -g ipfs 
```

6.  Run IPFS Node in a different terminal and keep running:
If you have problems with ipfs connection during running app etc, restart the daemon 
```sh
$ jsipfs daemon
```

7. Install yarn if not installed. Check if installed using 
```sh
yarn --version
```
If not installed install with below
```sh
$ npm install --global yarn
```

8. Enter project directory and install dependancies
```sh
$ cd nft_collectibles_masterclass
$ yarn install  
```

### Migrating contracts and Testing Locally to ensure all is working well

1. To compile contracts e.g you make changes to contracts
```sh
$ truffle compile 
```

Make sure your truffle.js or truffle-config.js file is properly configured for development environment.
2. Migrate contracts to local running instance ganache 
If using ganache-cli use 
```sh
$ truffle migrate --reset --network ganache_cli
```
If using ganache gui use 
```sh
$ truffle migrate --reset --network ganache_gui
```

3. To test contracts 
```sh
$ truffle test
```

4. Interact with locally deployed contracts and excute script to mint tokens. Esnure jsipfs daemon is running 
inand always running in a seperate terminal 

If using ganache-cli use
```sh
$ truffle exec src/backEnd/scripts/mint.js --network ganache_cli
$
```
If using ganache gui use
```sh
$ truffle exec src/backEnd/scripts/mint.js --network ganache_gui
$
```

5. Run app on localhost front-end
1. Run app locally 
```sh
$ yarn start
```
Enter dApp in browser at localhost:3000

### Deploying to Ethereum testnets and mainnet

Ensure truffle-config.js is properly confiured for the network you need to deploy to e.e rinkeby, ropsten etc
Duplicate the .env.example file and rename it .env. Add the PRIVATE_KEYS as the private key of the Metamask 
account you will use to deploy. This is the same account you will add testnet ether to. On Metamask click Account Details-> Export Private Key to copy private key. Go to [infura.io](https://infura.io/) and create a project and copy the ID into .env as INFURA_ID

- Note you may want to restart => jsipfs daemon <= before deployign to each of the different networks. 
- Note that you can use --reset when migrating to replace add new deployments 
e.g truffle migrate --reset --network kovan

1. Migrate contracts to Ethereum Kovan testnet. You will need Kovan ETH to pay for transactions. 
Get Kovan ETH into a Metamask account from this [Kovan faucet click here](https://linkfaucet.protofire.io/kovan). Copy your Metamask address into site and click "Send Me 0.1 Test ETH"
```sh
$ truffle migrate  --network kovan
```
Mint tokens on Kovan network
```sh
$ truffle exec src/backEnd/scripts/mint.js --network kovan
```
You can verify deployment, check transactions etc on [https://kovan.etherscan.io/](https://kovan.etherscan.io/)

2. Migrate contracts to Ethereum Rinkeby testnet. You will need Rinkeby ETH to pay for transactions. 
Get Rinkeby ETH into a Metamask account from this [Rinkeby faucet click here](http://rinkeby-faucet.com/). Copy your Metamask address into site and click "Submit" or this [Rinkey Faucet here](https://faucet.rinkeby.io/) which is prone to not working at times. Alternatively reach out to us on Slack for some Rinkeby ETH. 
```sh
$ truffle migrate --network rinkeby
```
Mint tokens on Kovan network
```sh
$ truffle exec src/backEnd/scripts/mint.js --network rinkeby
```
You can verify deployment, check transactions etc on [https://rinkeby.etherscan.io/](https://rinkeby.etherscan.io/)

3. Migrate contracts to Ethereum Ropsten testnet. You will need Ropsten ETH to pay for transactions. 

You may get Ropsten ETH through below faucets:
[https://faucet.metamask.io/](https://faucet.metamask.io/)
[https://faucet.ropsten.be/](https://faucet.ropsten.be/)
[https://faucet.dimensions.network/](https://faucet.dimensions.network/)

```sh
$ truffle migrate --network ropsten
```
Mint tokens on Ropsten network
```sh
$ truffle exec src/backEnd/scripts/mint.js --network ropsten
```
You can verify deployment, check transactions etc on [https://ropsten.etherscan.io/](https://ropsten.etherscan.io/)

4. Migrate contracts to Ethereum Mainnet. You will need real value ETH in the account. You can buy from exchanges or on Metamask Buy services. 
```sh
$ truffle migrate --network main
```
Mint tokens on Mainnet network
```sh
$ truffle exec src/backEnd/scripts/mint.js --network main
```
you can verify deployment, check transactions etc on [https://etherscan.io/](https://etherscan.io/)

### Optional publish front end to Surge
1. Run build and enter build directory
```sh
$ yarn run build
$ cd build
```
2. Install surge globally: 
```sh
$ npm i -g surge
```
"You may need to Login to surge and create account with email address and a password first time.  
If you forgot password you can ask for reset on terminal and get password reset link in your email." 
Select a unique domain name for your project e.g <uniquename>.surge.sh e.g asdfjkl.surge.sh where
my name of choice is asdfjkl

3. Deploy to surge. 
```sh
$ surge --domain asdfjkl.surge.sh
```
...and follow the instructions


### Optional publish on IPFS

1. Build app
```sh
$ yarn run build
```
2. Publish on IPFS
```sh
$ jsipfs add -r build
```
3. Copy the latest generated hash and paste into the place of hash below:
https://ipfs.io/ipfs/hash For the first time may take a while to load dApp
Create Human readable link [Use this site](https://bitly.com/)




