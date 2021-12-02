import { combineReducers } from 'redux';

function web3(state = {}, action) {
  switch (action.type) {
    case 'METAMASK_CHECKED':
      return { ...state, metamaskInstalled: action.metamaskInstalled }
    case 'WEB3_LOADED':
      return { ...state, connection: action.connection }
    case 'WEB3_ACCOUNT_LOADED':
      return { ...state, account: action.account }
    case 'WEB3_NETWORK_LOADED':
      return { ...state, networkId: action.networkId }
    default:
      return state
  }
}

function token(state = {}, action) {
  switch (action.type) {
    case 'TOKEN_LOADED':
      return { ...state, contract: action.contract }
    case 'TOKEN_BALANCE_LOADED':
      return { ...state, balance: action.balance }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  web3,
  token
});

export default rootReducer;
