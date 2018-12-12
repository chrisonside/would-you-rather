import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  // logOut
} from '../actions';

class UserDetails extends Component {
  render() {
    const { loggedInUser } = this.props;
    return (
      <div className='userdetails'>
        <h3 className='userdetails__name'>Hi {loggedInUser.name}</h3>
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