import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import { isObjectEmpty } from '../utils/helper';
import '../styles/app.scss';

import PollList from './PollList';
import UserDetails from './UserDetails';
import Nav from './Nav';
import SignIn from './SignIn';
import SignOut from './SignOut';
import NotFound from './NotFound';
import AddPoll from './AddPoll';
import Leaderboard from './Leaderboard';
import Poll from './Poll';

class App extends Component {

  render() {
    const { loggedInUser } = this.props;

    return (
      <div className='app'>

        <div className='app__wrapper'>

          {!isObjectEmpty(loggedInUser) &&
            <div className='user-admin'>
              <UserDetails></UserDetails>
              <SignOut></SignOut>
            </div>
          }

          {isObjectEmpty(loggedInUser) && <SignIn></SignIn>}

          {!isObjectEmpty(loggedInUser) &&
            <div>
              <Nav></Nav>
              <Switch>
                <Route exact path='/' component={PollList}/>
                <Route exact path='/add' component={AddPoll}/>
                <Route exact path='/page-not-found' component={NotFound}/>
                <Route exact path='/leaderboard' component={Leaderboard}/>
                <Route exact path='/:id' component={Poll}/>
                <Route path='*' component={NotFound} />
              </Switch>
            </div>
          }

        </div>

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