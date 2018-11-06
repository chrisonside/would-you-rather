import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import { isObjectEmpty } from '../utils/helper';
import '../styles/app.css';

import Home from './Home';
import SignIn from './SignIn';
import AddPoll from './AddPoll';
import Leaderboard from './Leaderboard';
import Poll from './Poll';

class App extends Component {

  render() {
    const { loggedInUser } = this.props;

    return (
      <div className="App">

        {isObjectEmpty(loggedInUser) && <SignIn></SignIn>}

        {!isObjectEmpty(loggedInUser) &&
          <div>
          <div>hello g</div>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/add-poll' component={AddPoll}/>
            <Route path='/leaderboard' component={Leaderboard}/>
            <Route path='/:id' component={Poll}/>
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