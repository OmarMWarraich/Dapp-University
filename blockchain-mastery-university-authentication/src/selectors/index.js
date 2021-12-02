import { get } from 'lodash'
import { createSelector } from 'reselect'

// Web3
const metamaskInstalled = state => get(state, 'web3.metamaskInstalled', null)

const account = state => get(state, 'web3.account', null)
export const accountSelector = createSelector(account, a => a)

const networkId = state => get(state, 'web3.networkId', null)

// Must use KOVAN network
const networkIsValid = state => {
  return(networkId(state) === 42)
}

const token = state => get(state, 'token.contract', null)

const tokenBalance = state => get(state, 'token.balance', null)

const isTokenHolder = state => {
  return(tokenBalance(state) > 0)
}

export const loadingSelector = createSelector(
  metamaskInstalled,
  networkId,
  networkIsValid,
  token,
  tokenBalance,
  (metamaskInstalled, networkId, networkIsValid, token, tokenBalance) => {
    if(metamaskInstalled === false) {
      return false
    }

    if(typeof networkId === "number" && networkIsValid === false) {
      return false
    }

    return(
      metamaskInstalled === null ||
      networkId === null ||
      account === null ||
      token === null ||
      tokenBalance === null
    )
  }
)

export const isAuthenticatedSelector = createSelector(
  metamaskInstalled,
  networkIsValid,
  isTokenHolder,
  (metamaskInstalled, networkIsValid, isTokenHolder) => {
    return(metamaskInstalled && networkIsValid && isTokenHolder)
  }
)

export const authenticationErrorsSelector = createSelector(
  metamaskInstalled,
  networkIsValid,
  isTokenHolder,
  (metamaskInstalled, networkIsValid, isTokenHolder) => {
    let authenticationErrors = []
    if(!metamaskInstalled) {
      authenticationErrors.push("You must use Metamask to continue.")
    }
    if(!networkIsValid) {
      authenticationErrors.push("Please connect to the Kovan test network in Metamask.")
    }
    if(!isTokenHolder) {
      authenticationErrors.push("You must be a token holder to access this website.")
    }
    return authenticationErrors
  }
)
