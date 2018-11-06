import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isObjectEmpty } from '../utils/helper';

import SignIn from './SignIn';

// import {
//   getQuestions
// } from '../actions';

class AddPoll extends Component {

  render() {
    const { loggedInUser } = this.props;

    return (
      <div className='form'>
        {isObjectEmpty(loggedInUser) && <SignIn></SignIn>}
        {!isObjectEmpty(loggedInUser) &&
          <div>
             Hello add poll
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps( {loggedInUser} ) {
  return {
    loggedInUser
 }
}

export default connect(
  mapStateToProps,
  null
)(AddPoll);