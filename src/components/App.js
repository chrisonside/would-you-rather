import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
// import ReactLoading from 'react-loading';

import { isObjectEmpty } from '../utils/helper';
import '../styles/app.css';

import Home from './Home';
import SignIn from './SignIn';
import UserDetails from './UserDetails';
import PollList from './PollList';
import AddPoll from './AddPoll';
import Leaderboard from './Leaderboard';
import Poll from './Poll';

class App extends Component {

  render() {
    const { loggedInUser } = this.props;

    return (
      <div className="App">

        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/add-poll' component={AddPoll}/>
          <Route exact path='/leaderboard' component={Leaderboard}/>
          <Route exact path='/:id?' component={Poll} />
        </Switch>

      </div>

    );
  }
}

export default App;