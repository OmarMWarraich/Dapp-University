## Flashloan Example Code 

This project is a step by step guide on how to get a flashloan on DY/DX by implementing simple Solidity code on Remix on a 
Ethereum mainnet fork. With Flashloan.sol you can borrow some WETH on DY/DX using flashloan without doing anything with the amount as its just immediately paid back. With FlashLoanLeveragedYieldFarm you can use flashloan to earn more on Compund. Examples will be illustrated on Remix on Ethereum Mainnet Fork

##### Folder / Directory Structure (key folders and files)
  * Flashloan.sol
  * FlashLoanLeveragedYieldFarm.sol
  * SimpleArb.sol
  * truffle-mint-dai-master
  * README.md

### Requirements, Technology, Tools and Resources

* [Flashloan](https://coinmarketcap.com/alexandria/glossary/flash-loans) - Flashloans allow you to borrow lots of funds for a very small fee without need for collateral do anything else with funds as long as repayments happens in same transaction.
* [Remix IDE](https://remix.ethereum.org/) - web based ethereum development application allowing you to write, compile and deploy smart contracts to Ethereum networks
* [Ganache](https://www.trufflesuite.com/ganache) - local blockchain development
  - will need to run mainnet fork in the terminal [Read up more on forking mainnet here](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/)
* [Infura](https://infura.io/) - connection to ethereum networks. will use this for RPC Node URL for fork with ganache.
* [Solidity](https://docs.soliditylang.org/en/v0.7.4/) - ethereum smart contract language
* [Metamask Wallet](https://metamask.io/) - You need to install Metamask Wallet
   - [How to install Metamask](https://blog.wetrust.io/how-to-install-and-use-metamask-7210720ca047)
* [ERC20](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20) - ERC20 Token standards
* [Compound Protocol](https://app.compound.finance/) - supply or borrow tokens and earn cTokens
* Flashloan Providers 
  * [DY/DX]() - Decentralized Exchange offering flashloans with cheap feess; that is used on this example code
  Alternative Flashloan Providers that can be used or to investigate
    * [UniswapV2 Flashswaps](https://docs.uniswap.org/protocol/V2/concepts/core-concepts/flash-swaps) - access temporary funds 
      - Example Uniswap FlashSwap can be [found here](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/examples/ExampleFlashSwap.sol)
    * [Aave Flashloan](https://docs.aave.com/developers/guides/flash-loans) - uncollaterized loan that must be returned in same transaction
    * [Binance Smart Chain - Pancake Swap]() - PancakeSwap as a fork of Uniswap deployed on Binance Smart Chain has the same functionality for Flashloan using e.g ..pancakeCall vs UniswapV2Cal when considering version2 Uniswap
    * [Kollateral](https://www.kollateral.co/) - a liquidity aggregator 
    * [UniLend](https://docs.unilend.finance/the-protocol/flash-loan/performing-flashloan) - UniLend Flashloans
* [Augement your profits with trading bot](https://dappuniversity.teachable.com/courses/940808/lectures/24527435) - TradingBot Masterclass
* Uses of Flashloans
  * Arbitrage - use the vast funds to make profits from price discrepencies e.g on Exchange See SimpleArb.sol 
  * Leverage - increase exposure e.g earn more with Yield Farmin on protocols like Compound. See FlashloanLeveragedYieldFarm project


### Step by step guide to run Basic Get flashloan code -> FlashLoan.sol on Remix

1. Install Metamask - Follow [How to install Metamask](https://blog.wetrust.io/how-to-install-and-use-metamask-7210720ca047)

2. Install and run ganache-cli
Ignore if either installed already! To fork need to use use ganache-cli vs [Ganache GUI](https://www.trufflesuite.com/ganache), install ganache-cli globally. Note that ganache-cli rus on port 8545 and ganache-gui runs on port 7545 as placced in truffle-config.js. ensure your Metamask Custom Network setting for localhost are setup for correct port. 
Check if ganache-cli installed first with
```sh
ganache-cli --version
```
If not installed install with below
```sh
$ npm install -g ganache-cli
```
3. Get Infura RPC URL 
-Go to [infura.io](infura.io) create an account and new project if already dont have and copy the mainnet URL from project which look slike this example https://mainnet.infura.io/v3/eeeee207d32c4262ae008b7b55d0255e where last part eeeee207d32c4262ae008b7b55d0255e is the Project ID

4. Run ganache mainnet fork 
Run ganache-cli fork of the ethereum mainnet in different terminal and keep running when uisng Remix with account with a lot 
```sh
ganache-cli -f https://mainnet.infura.io/v3/968a6207d32c4262ae008b7b55d0255e 
```
Copy private keys into Metamask eg. first account on ganache-cli running terminal 

5. Go to [Remix IDE](https://remix.ethereum.org/) 
   - Go to folder contracts and right click and select New File 
   - Name the file FlashLoan.sol (When running FlashLoanLeveragedYieldFarm.sol name is as such)
   - Copy the code from here FlashLoan.sol(When running FlashLoanLeveragedYieldFarm.sol copy relevant code) and paste into Remix new file 
   - Compile the code 
     - Select Solidity Compiler Page
     - On Compiler Options dropdown select 0.5.16 version
     - Click "Compile FlashLoan.sol" button
   - Deploy the code 
     - Select Deploy and Run Transactions Page
     - Ensure your Metamaks is connected to localhost running ganache fork and have imported private key a
     - Environment dropdown select Injected Web3 (so that you can use Metamask and the fork)
     - Accounts dropdwon should show your accounts from Metamask(the imported account with 100 ETH)
     - Make sure under Contract section - FlashLoan.sol is selected contract
     - Under Value Section - add amount of Wei(used to pay for fees) to send in with contract deployment 
       - e.g add 10 Wei 
     - Click Deploy and confirm transaction on Metamask popup
   - Interact with Deployed Contract
     - On same Deploy contract page on Remix, Scroll down to Deployed Contracts section
     - Click on the contract to expand 
     - View buttons for all the functions you can carry out on contract e.g callFunction, getFlashloan
     - On getFlashloan enter the address of a token to borrow 
       e.g address WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
       - enter the amount of token e.g 100 WETH as => 100000000000000000000
       - you parameters must be e.g 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2,100000000000000000000
   - View transaction 
       - Remix output under the code that appears after completing Metamask transaction should show success


### Step by step guide to run Leveraged Yield Farming with flashloan -> FlashLoanLeveragaedYieldFarm.sol on Remix

1. Follow the steps 1-3 above

2. Fork Ethereum Mainnet with ganache and get/mint some DAI for the first account. [Code thanks to https://github.com/ryanio/truffle-mint-dai](https://github.com/ryanio/truffle-mint-dai)
   - Open the folder truffle-mint-dai-master in your IDE/Editor 
   - Follow the instructions in READ.ME summarised as below in your terminals
     - $ yarn
     - $ export ETHEREUM_NODE=https://mainnet.infura.io/v3/your_project_id
     - $ export USER_ADDRESS=$(yarn --silent getAddress)
     - $ yarn ganache 
     - $ yarn test
   - Add Asset to Metamask so you can see the new DAI Balance in imported account
     Click on Assets and Add Asset using the DAI Mainnet Address of 0x6b175474e89094c44da98b954eedeac495271d0f

3. Go to [Remix IDE](https://remix.ethereum.org/) 
   - Go to folder contracts and right click and select New File 
   - Name the file FlashLoanLeveragedYieldFarm.sol
   - Copy the code from here FlashLoanLeveragedYieldFarm.sol and paste into Remix new file 
   - Compile the code 
     - Select Solidity Compiler Page
     - On Compiler Options dropdown select 0.5.16 version
     - Click "Compile FlashLoanLeveragedYieldFarm.sol" button
   - Deploy the code 
     - Select Deploy and Run Transactions Page
     - Ensure your Metamask is connected to localhost running ganache fork and have imported private key 
     - Environment dropdown select Injected Web3 (so that you can use Metamask and the fork)
     - Accounts dropdwon should show your accounts from Metamask(the imported account with balance of DAI e.g 0.3 on Metamask)
     - Make sure under Contract section - FlashLoanLeveragedYieldFarm.sol is selected contract
     - Click Deploy and confirm transaction on Metamask popup
     - Copy the deployed contract address
     - Send some DAI e.g 2 DAI to the contract to pay for flashloan. In Metamask clci on Asset DAI and click SEnd to send DAI to contract address
   - Interact with Deployed Contract
     - On same Deploy contract page on Remix, Scroll down to Deployed Contracts section
     - Click on the contract to expand 
     - View buttons for all the functions you can carry out on contract e.g depositDAI, withdrawDai
     - To Deposit DAI(getflashloan and payback) => On depositDAI enter the amount of DAI to DEPOSIT e.g 1 DAI = 1000000000000000000 and Click DepostDAI button
     - To Withdraw DAI => On withdrawDai button click to withdraw add the amount of DAI you deposited above e.g 1000000000000000000 
   - View transactions
       - Remix output under the code that appears after completing Metamask transactions should show success



