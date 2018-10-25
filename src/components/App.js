import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
// import ReactLoading from 'react-loading';

import { isObjectEmpty } from '../utils/helper';
import '../styles/app.css';

import SignIn from './SignIn';
import UserDetails from './UserDetails';
import PollList from './PollList';

import {
  addCurrentUser
} from '../actions';

class App extends Component {

  render() {
    const { loggedInUser } = this.props;

    return (
      <div className="App">

        {isObjectEmpty(loggedInUser) && <SignIn></SignIn> }

        {!isObjectEmpty(loggedInUser) &&
          <div>
            <UserDetails></UserDetails>
            <PollList></PollList>
          </div>
        }

        {/* <Nav></Nav>

        <UserDetails></UserDetails>

        <Polls></Polls>

        <Page404></Page404>

        <AddPoll></AddPoll> */}

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
)(App);