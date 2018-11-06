import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isObjectEmpty } from '../utils/helper';
import { Link } from 'react-router-dom';

import SignIn from './SignIn';

// import {
//   getQuestions
// } from '../actions';

import { isArrayEmpty } from '../utils/helper';

class Leaderboard extends Component {

  render() {
    const { loggedInUser } = this.props;

    return (
      <div className='leaderboard'>
        <div>
          Leaderboard goes here
        </div>
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
)(Leaderboard);