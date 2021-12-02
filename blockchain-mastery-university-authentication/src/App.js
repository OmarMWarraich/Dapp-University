import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Navbar from './components/app/Navbar'
import Home from './components/app/Home'
import VideoVault from './components/app/VideoVault'
import Settings from './components/app/Settings'
import Login from './components/app/Login'
import {
  isAuthenticatedSelector,
  loadingSelector
} from './selectors'
import {
  checkMetamask,
  loadWeb3,
  loadAccount,
  loadNetwork,
  loadToken,
  loadTokenBalance
} from './store/interactions'

const Loading = () => (
  <div id="content"></div>
)

const Content = ({ component: Component, ...props }) => {
  let { isAuthenticated } = props
  return(
    <div id="content">
      <Switch>
        <Route
          path='/login'
          render={(props) => {
            return(<Login {...props} />)
          }}
        />
        <Route
          path='/settings'
          render={(props) => (
            isAuthenticated
              ? <Settings {...props} />
              : <Redirect to={{ pathname: '/login'}} />
          )}
        />
        <Route
          path='/videos'
          render={(props) => (
            isAuthenticated
              ? <VideoVault {...props} />
              : <Redirect to={{ pathname: '/login'}} />
          )}
        />
        <Route
          path='/'
          render={(props) => (
            isAuthenticated
              ? <Home {...props} />
              : <Redirect to={{ pathname: '/login'}} />
          )}
        />
      </Switch>
    </div>
  )
}

class App extends Component {
  async componentWillMount() {
    let dispatch = this.props.dispatch
    let metamaskDetected = await checkMetamask(window.web3, dispatch)
    if(!metamaskDetected) {
      return
    }
    const web3 = await loadWeb3(dispatch)
    const networkId = await loadNetwork(web3, dispatch)
    // ENFORCE KOVAN NETWORK
    if(networkId !== 42) {
      return
    }
    const account = await loadAccount(web3, dispatch)
    const token = await loadToken(web3, dispatch)
    await loadTokenBalance(token, account, dispatch)
  }

  render() {
    let {
      loading,
      isAuthenticated
    } = this.props

    return (
      <BrowserRouter>
        <div className="app">
          <Navbar {...this.props} />
          { loading
            ? <Loading />
            : <Content
                isAuthenticated={isAuthenticated}
                {...this.props}
              />
          }
        </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
    isAuthenticated: isAuthenticatedSelector(state)
  }
}

export default connect(mapStateToProps)(App);
