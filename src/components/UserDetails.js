import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  // logOut
} from '../actions';

class UserDetails extends Component {
  render() {
    const { loggedInUser } = this.props;
    return (
      <div>
        <h3 className='loggedIn__name'>Hi there, {loggedInUser.name}</h3>
      </div>
    );
  }
}

// Format shape of store data for this component
function mapStateToProps( {loggedInUser} ) {
  return {
    loggedInUser
  }
}

export default connect(
  mapStateToProps,
  null
)(UserDetails);