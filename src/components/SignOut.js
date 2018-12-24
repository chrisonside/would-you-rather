import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  signOut,
} from '../actions';

class SignOut extends Component {

  constructor (props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut(e) {
    this.props.signOut();
  }

  render() {
    return (
      <button className='signout__click' onClick={this.handleSignOut}>Sign out</button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(signOut()),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SignOut);