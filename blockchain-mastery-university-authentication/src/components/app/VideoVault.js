import React, { Component } from 'react';
import { connect } from 'react-redux'
import Week1Video from './Week1Video'

class VideoVault extends Component {
  async componentWillMount() {
    const { dispatch } = this.props
    await this.loadBlockchainData(dispatch)
  }

  async loadBlockchainData(dispatch) {
    // TODO: Wire up blockchain connection
  }

  render() {
    return(
      <div>
        <h1>Video Vault</h1>
        <hr/>
        <h2>Week #1: January 29, 2020</h2>
        <Week1Video />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    // TODO: Fill me in
  };
}

export default connect(mapStateToProps)(VideoVault);
