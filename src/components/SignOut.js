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
    console.log('clicked');
    this.props.signOut();
  }

  render() {
    return (
      <button className='signout__click' onClick={this.handleSignOut}>Sign out</button>
    );
  }
}

// Bind dispatch to the action creators required for this component - in this case, to populate my Store with my users
function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(signOut()),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SignOut);