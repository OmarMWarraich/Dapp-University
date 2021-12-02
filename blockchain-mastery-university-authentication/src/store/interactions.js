import Web3 from 'web3'
import {
  TOKEN_ABI,
  TOKEN_ADDRESS
} from '../config'
import {
  metamaskChecked,
  web3Loaded,
  web3AccountLoaded,
  networkLoaded,
  tokenLoaded,
  tokenBalanceLoaded
} from './actions'

export const checkMetamask = (web3, dispatch) => {
  // Evaluates to true if window.web3 exists
  let metamaskInstalled = (typeof window.web3 !== 'undefined')
  dispatch(metamaskChecked(metamaskInstalled))
  return metamaskInstalled
}

export const loadWeb3 = (dispatch) => {
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
  dispatch(web3Loaded(web3))
  return web3
}

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]
  dispatch(web3AccountLoaded(account))
  return account
}

export const loadNetwork = async (web3, dispatch) => {
  // Evaluates to true if window.web3 exists
  const networkId = await web3.eth.net.getId()
  dispatch(networkLoaded(networkId))
  return networkId
}

export const loadToken = async (web3, dispatch) => {
  const token = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS)
  dispatch(tokenLoaded(token))
  return token
}

export const loadTokenBalance = async (token, account, dispatch,) => {
  // Token balance in wallet
  const tokenBalance = await token.methods.balanceOf(account).call()
  dispatch(tokenBalanceLoaded(tokenBalance))
}
