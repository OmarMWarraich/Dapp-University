import React, { Component } from 'react'
import { connect } from 'react-redux'

class TipJar extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    // TODO: Fill me in...
  }

  render() {
    return(
      <div>
        <h1>Settings</h1>
        <hr/>
        <h3>Manage Subscription</h3>
        <p>To manage, update, or cancel your subscription please email gregory@dappuniversity.com.</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    // TODO: Fill me in...
  }
}

export default connect(mapStateToProps)(TipJar);
