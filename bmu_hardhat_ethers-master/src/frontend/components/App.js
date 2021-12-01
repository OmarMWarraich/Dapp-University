import TokenAddress from '../contractsData/contract-address.json'
import TokenArtifacts from '../contractsData/Token.json'
import { Button } from "react-bootstrap";
import React, { Component } from 'react';
import { ethers } from "ethers";
import logo from './logo.png';

class App extends Component {

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(){
    /* User connect to dApp for 1st time */
    if(typeof window.ethereum !== 'undefined'){
      await this.update()
      /* User switch account */
      window.ethereum.on('accountsChanged', async () => {
        await this.update()
      });
      /* User switch network */
      window.ethereum.on('chainChanged', async () => {
        await this.update()
      });
    }
  }

  async update() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      const signer = await provider.getSigner()
      const account = await signer.getAddress()

      const token = await new ethers.Contract(TokenAddress.Token, TokenArtifacts.abi, signer)

      const tokenBalance = await token.balanceOf(account.toString())
      const etherBalance = await provider.getBalance(account.toString())
      
      this.setState({
        reset: false,
        token: token,
        provider: provider,
        account: account.toString(),
        tokenBalance: tokenBalance.toString(),
        etherBalance: etherBalance.toString()
      })
    } catch (e) {
      console.log('Error, update: ', e)
      this.setState({ reset: true })
    }
  }

  burnToken = async () => {
    try{
      const tx = await this.state.token.transfer('0x0000000000000000000000000000000000000000', '1')
      const receipt = await tx.wait();
      this.update()
    } catch (e) {
      console.log('Error with burning token: ', e)
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      provider: null,
      account: null,
      token: null,
      ethBalance: null,
      tokenBalance: null,
      reset: true
    }
  }

  render() {
    if(this.state.reset===true){
      return(
        <div>
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
              className="navbar-brand col-sm-3 col-md-2 mr-0"
              href="http://www.dappuniversity.com/bootcamp"
              target="_blank"
              rel="noopener noreferrer"
            >
              BMU HardHat + Ethers tutorial
            </a>
          </nav>

          <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto">
                  <a
                    href="http://www.dappuniversity.com/bootcamp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={logo} className="App-logo" alt="logo" />
                  </a>
                  <h1>Something wrong with network or account</h1>
                </div>
              </main>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="text-monospace text-center">
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
              className="navbar-brand col-sm-3 col-md-2 mr-0"
              href="http://www.dappuniversity.com/bootcamp"
              target="_blank"
              rel="noopener noreferrer"
            >
              BMU HardHat + Ethers tutorial
            </a>
          </nav>

          <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto">
                  <a
                    href="http://www.dappuniversity.com/bootcamp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={logo} className="App-logo" alt="logo" />
                  </a>
                  <h1>Hi {this.state.account}</h1>
                  <h2>Your ETH balance is: {(Number(this.state.etherBalance)/10**18).toFixed(5)}</h2>
                  <h3>Your Token Balance is {this.state.tokenBalance}</h3>
                  <Button className="text-monospace" variant="danger" block onClick={this.burnToken}>
                    <h5>Burn 1 token</h5>
                  </Button>
                </div>
              </main>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;