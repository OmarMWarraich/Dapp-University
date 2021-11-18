import { nftsData } from '../backEnd/scripts/nftsData.js'
import Contract_EVM from '../backEnd/abis_evm/NFT.json'
import Contract_OVM from '../backEnd/abis_ovm/NFT.json'
import Token from '../backEnd/abis_ovm/Token.json'
import Web3 from 'web3'
import {
  web3Loaded,
  contractLoaded,
  web3NetworkLoaded,
  web3AccountLoaded,
  web3BalanceLoaded,
  metadataLoaded,
  nftStateLoaded
} from './actions'

const networks = {
  '1': 'Mainnet Ethereum',
  '3': 'Ropsten Ethereum',
  '42': 'Kovan Ethereum',
  '4': 'Rinkeby Ethereum',
  '10': 'Optimistic Mainnet',
  '69': 'Optimistic Kovan',
  '420': 'Optimistic Local'
}

export const loadWeb3 = async (dispatch) => {
  try{
    if(typeof window.ethereum!=='undefined'){
      window.ethereum.autoRefreshOnNetworkChange = false;
      const web3 = new Web3(window.ethereum)
      dispatch(web3Loaded(web3))
      return web3
    }
  } catch (e) {
    console.log('Error, load Web3: ', e)
  }
}

export const loadNetwork = async (dispatch, web3) => {
  try{
    const netId = await web3.eth.net.getId()
    let network = networks[netId.toString()] ? networks[netId.toString()] : 'Other'
    dispatch(web3NetworkLoaded(network))
    return network
  } catch (e) {
    dispatch(web3NetworkLoaded('Wrong network'))
    console.log('Error, load network: ', e)
  }
}

export const loadAccount = async (dispatch, web3) => {
  try{
    const accounts = await web3.eth.getAccounts()
    const account = await accounts[0]
    if(typeof account !== 'undefined'){
      dispatch(web3AccountLoaded(account))
      return account
    } else {
      dispatch(web3AccountLoaded(null))
      return null
    }
  } catch (e) {
    console.log('Error, load account: ', e)
  }
}

export const loadBalance = async (dispatch, web3, account) => {
  const netId = await web3.eth.net.getId()
  let network = networks[netId.toString()] ? networks[netId.toString()] : 'Other'
  let isOptimistic = network.startsWith('Optimistic')
  let token

  if(isOptimistic) {
    try {
      token = new web3.eth.Contract(Token.abi, Token.networks[netId].address)
      const tokenBalance = await token.methods.balanceOf(account).call()
      dispatch(web3BalanceLoaded((tokenBalance/10**18).toFixed(5)))
    } catch (e) {
      console.log('Error, load balance: ', e)
    }

  } else {
    try {
      const etherBalance = await web3.eth.getBalance(account)
      dispatch(web3BalanceLoaded((etherBalance/10**18).toFixed(5)))
    } catch (e) {
      console.log('Error, load balance: ', e)
    }
  }
  
}

export const loadContract = async (dispatch, web3, netId) => {

  let network = networks[netId.toString()] ? networks[netId.toString()] : 'Other'
  let isOptimistic = network.startsWith('Optimistic')
  let Contract =  isOptimistic ? Contract_OVM : Contract_EVM

  try {
    const contract = new web3.eth.Contract(Contract.abi, Contract.networks[netId].address)
    dispatch(contractLoaded(contract))
    return contract
  } catch (e) {
    window.alert('Wrong network!')
    console.log('Error, load contract: ', e)
    dispatch(contractLoaded(null))
    return null
  }
}

export const update = async (dispatch) => {
  try{
    let account, web3, netId, contract

    web3 = await loadWeb3(dispatch)
    await loadNetwork(dispatch, web3)
    account = await loadAccount(dispatch, web3)
    netId = await web3.eth.net.getId()
    contract = await loadContract(dispatch, web3, netId)
  
    await loadNftData(dispatch, contract)
    await loadNftState(dispatch, contract)
    if(account && contract){
      await loadBalance(dispatch, web3, account)
    }
  } catch (e) {
    console.log('Error, update data: ', e)
  }
}

//get NFTs data from nftsData.js generated while minting
export const loadNftData = async (dispatch, contract) => {
  try{
    let totalSupply, uri
    totalSupply = await contract.methods.totalSupply().call()
    uri = await contract.methods.tokenURI(1).call()
    
    fetch(uri)
      .then(res => res.json())
      .then(result => {
        if(result.image===nftsData[0].image || Number(totalSupply)===nftsData.length){
          dispatch(metadataLoaded(nftsData))
        }
      });
      console.log(nftsData)
  } catch (e) {
    console.log('Error, load images', e)
  }
}

//get data about NFT's sold state
export const loadNftState = async (dispatch, contract) => {
  try{
    const tab = []
    const totalSupply = await contract.methods.totalSupply().call()

    for(let i=0; i<totalSupply; i++){
      const state = await contract.methods.sold(i).call()
      if(state){
        tab.push(await contract.methods.ownerOf(i).call()) //if sold, then add owner address
      } else {
        tab.push(state)
      }
    }
    dispatch(nftStateLoaded(tab))
  } catch (e) {
    console.log('Error, load NFT state', e)
  }
}

export const buyNft = async (dispatch, id, price) => {
  const web3 = await loadWeb3(dispatch)
  const netId = await web3.eth.net.getId()
  let network = networks[netId.toString()] ? networks[netId.toString()] : 'Other'
  let isOptimistic = network.startsWith('Optimistic')
  let Contract =  isOptimistic ? Contract_OVM : Contract_EVM
  const contract = await loadContract(dispatch, web3, netId)
  const account = await loadAccount(dispatch, web3)
  let token
  
  if(isOptimistic) {
      try {
        token = new web3.eth.Contract(Token.abi, Token.networks[netId].address)
        if(network === 'Optimistic Kovan' || network === 'Optimistic Mainnet') {
          await token.methods.approve(contract._address, price.toString()).send({from:account, gas:15000000})
          await contract.methods.buy(id, price.toString()).send({from: account, gas:15000000})
          .on('receipt', async (r) => {
            update(dispatch)
            window.alert(`Congratulations, you've received NFT with ID: ${id}\nAddress: ${Contract.networks[netId].address}`)
          })
          .on('error',(error) => {
            console.error(error)
            window.alert(`There was an error!`)
          })
        } else if(network === 'Optimistic Local') { // optimistic local requires 0 gas price
          await token.methods.approve(contract._address, price.toString()).send({from:account, gasPrice: 0}) 
          await contract.methods.buy(id, price.toString()).send({from: account, gaPrice: 0})
          .on('receipt', async (r) => {
            update(dispatch)
            window.alert(`Congratulations, you've received NFT with ID: ${id}\nAddress: ${Contract.networks[netId].address}`)
          })
          .on('error',(error) => {
            console.error(error)
            window.alert(`There was an error!`)
          })
        }       
      } catch(error) {
        console.log('Error buying with token', error)
      }
  } else {
    try{
      await contract.methods.buy(id).send({from: account, value: price})
        .on('receipt', async (r) => {
          update(dispatch)
          window.alert(`Congratulations, you've received NFT with ID: ${id}\nAddress: ${Contract.networks[netId].address}`)
        })
        .on('error',(error) => {
          console.error(error)
          window.alert(`There was an error!`)
        })
    } catch (e){
      console.log('Error, buy NFT', e)
    }

  }
  
}