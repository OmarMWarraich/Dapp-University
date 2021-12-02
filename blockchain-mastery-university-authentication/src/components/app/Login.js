import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  authenticationErrorsSelector
} from '../../selectors'

const styles = {
  content: {
    textAlign: 'center',
  },
  emoji: {
    fontSize: '100px'
  },
  heading: {
    fontSize: '36px',
    marginBottom: '20px'
  },
  error: {
    color: 'red',
    fontSize: '24px',
    marginBottom: '20px'
  }
}

const Errors = ({ component: Component, ...props }) => {
  let { authenticationErrors } = props
  return (
    <div style={styles.content}>
      <div style={styles.emoji}><span role="img" aria-label="sadface">😢</span></div>
      <h1 style={styles.heading}>
        <br/>
        WHOOPS, THERE'S A PROBLEM...
      </h1>
      <p style={styles.error}>
        {authenticationErrors[0]}
      </p>
      <p>If you need assistance with this, reach out to the <a href="http://dappuniversity.slack.com/" target="_blank" rel="noopener noreferrer">community here</a>.</p>
    </div>
  )
}

const Success = ({ component: Component, ...props }) => {
  return (
    <div style={styles.content}>
      <div style={styles.emoji}><span role="img" aria-label="thumbsup">👍</span></div>
      <h1 style={styles.heading}>
        <br/>
        YOU'RE ALL SET!
      </h1>
      <p>Start <a href="/home">mastering blockchain now</a>.</p>
    </div>
  )
}

class Login extends Component {
  render() {
    let { authenticationErrors } = this.props
    return(
      authenticationErrors.length > 0 ? <Errors {...this.props} /> : <Success {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticationErrors: authenticationErrorsSelector(state)
  }
}

export default connect(mapStateToProps)(Login);
