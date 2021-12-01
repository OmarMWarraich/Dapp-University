require('dotenv').config()
const { ethers } = require('ethers')

const provider = ethers.getDefaultProvider('rinkeby')

const WALLET = '' // ADD YOUR WALLET ADDRESS HERE
let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
wallet = wallet.connect(provider)

const DAI_ADDRESS = '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735' // Rinkeby DAI address
const DAI_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint amount) returns (boolean)"
]

const dai = new ethers.Contract(DAI_ADDRESS, DAI_ABI, wallet)

const getDaiBalance = async () => {
  let balance = await dai.balanceOf(wallet.address)
  balance = ethers.utils.formatEther(balance)
  console.log(balance, 'DAI')
}

const sendDai = async () => {
  console.log('Balance before transfer')
  await getDaiBalance()
  const to = '' // Add your 2nd wallet address here...
  const amount = ethers.utils.parseUnits('1.0', 18); // 1 Dai
  const tx = await dai.transfer(to, amount)
  await tx.wait()
  console.log('Dai Transferred!')
  await getDaiBalance()
}

sendDai()
