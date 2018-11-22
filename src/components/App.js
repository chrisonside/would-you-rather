import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import { isObjectEmpty } from '../utils/helper';
import '../styles/app.css';

import Home from './Home';
import UserDetails from './UserDetails';
import Nav from './Nav';
import SignIn from './SignIn';
import NotFound from './NotFound';
import AddPoll from './AddPoll';
import Leaderboard from './Leaderboard';
import Poll from './Poll';

class App extends Component {

  render() {
    const { loggedInUser } = this.props;

    return (
      <div className="App">

        <Nav></Nav>

        {isObjectEmpty(loggedInUser) && <SignIn></SignIn>}

        {!isObjectEmpty(loggedInUser) &&
          <div>
            <UserDetails></UserDetails>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/add' component={AddPoll}/>
              <Route exact path='/page-not-found' component={NotFound}/>
              <Route exact path='/leaderboard' component={Leaderboard}/>
              <Route exact path='/:id' component={Poll}/>
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        }

      </div>

    );
  }
}

function mapStateToProps( {loggedInUser} ) {
  return {
    loggedInUser,
 }
}

// https://github.com/ReactTraining/react-router/issues/4671#issuecomment-285320076
export default withRouter(connect(
  mapStateToProps,
  null,
)(App));