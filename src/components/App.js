import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
// import ReactLoading from 'react-loading';

import '../styles/app.css';
import SignIn from './SignIn';

class App extends Component {

  // componentDidMount() {
  // }

  render() {

    // const { userLoggedIn } = this.state;

    return (
      <div className="App">

        {/* {!userLoggedIn && <SignIn></SignIn> } */}

        <SignIn></SignIn>

        {/* <Nav></Nav>

        <UserDetails></UserDetails>

        <Polls></Polls>

        <Page404></Page404>

        <AddPoll></AddPoll> */}

      </div>

    );
  }
}

function mapStateToProps(state) {
 return  {
  userLoggedIn: state.userLoggedIn
 }
}


export default connect(
  mapStateToProps
)(App);