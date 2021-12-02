// METAMASK
export function metamaskChecked(metamaskInstalled) {
  return {
    type: 'METAMASK_CHECKED',
    metamaskInstalled // boolean: true/false
  }
}

// WEB3
export function web3Loaded(connection) {
  return {
    type: 'WEB3_LOADED',
    connection
  }
}

export function web3AccountLoaded(account) {
  return {
    type: 'WEB3_ACCOUNT_LOADED',
    account
  }
}

export function networkLoaded(networkId) {
  return {
    type: 'WEB3_NETWORK_LOADED',
    networkId
  }
}

// TOKEN
export function tokenLoaded(contract) {
  return {
    type: 'TOKEN_LOADED',
    contract
  }
}

export function tokenBalanceLoaded(balance) {
  return {
    type: 'TOKEN_BALANCE_LOADED',
    balance
  }
}
