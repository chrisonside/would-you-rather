import React, { Component } from 'react';

import UserDetails from './UserDetails';
import PollList from './PollList';

class Home extends Component {

  render() {

    return (
      <div className="Home">
        <div>Home page!</div>
        <div>
          <UserDetails></UserDetails>
          <PollList></PollList>
        </div>
      </div>

    );
  }
}

export default Home;