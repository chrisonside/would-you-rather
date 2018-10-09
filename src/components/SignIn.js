import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getUsers
} from '../actions';

class SignIn extends Component {

  // Populate users data in Redux Store. I'm subscribed to users updates, so this will trigger a rerender
  componentDidMount() {
    console.log('mounted');
    const { getUsers } = this.props;
    getUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <div>
         {/* {users && <SignIn></SignIn> } */}
         <div>Hello sign in </div>
      </div>
    );
  }
}

function mapStateToProps( {users}) {
  return  {
   users
  }
 }

// Bind dispatch to the action creators required for this component - in this case, to populate my Store with my users
function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(getUsers())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);