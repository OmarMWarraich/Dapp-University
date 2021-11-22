// Load environment variables
require('dotenv').config();

// Connect to Ethereum node
const Web3 = require('web3')
const rpcURL = 'https://mainnet.infura.io/v3/' + process.env.INFURA_ID
const web3 = new Web3(rpcURL)

this.previousBlock = '0'
this.totalWeiBurned = 0

setInterval(() => {
  // get latest block
  web3.eth.getBlock('latest').then((block) => {
    if(block.number.toString() > this.previousBlock.toString()) {
      const gasUsedWei = block.gasUsed.toString()
      const baseFeeWei = web3.utils.hexToNumberString(block.baseFeePerGas)
      const burnedWei = gasUsedWei * baseFeeWei

      const burnedEth = web3.utils.fromWei(burnedWei.toString(), 'Ether')
      const burnedEthFormatted = (Math.round(burnedEth * 100) / 100).toString()

      this.totalWeiBurned = this.totalWeiBurned + burnedWei
      const totalEthBurned = web3.utils.fromWei(this.totalWeiBurned.toString(), 'Ether')

      console.log(burnedEthFormatted, 'ETH was burned at block #', block.number.toString())
      console.log('A total of', totalEthBurned, 'ETH has been burned.')
      this.previousBlock = block.number
    }
  })
}, 1000)
