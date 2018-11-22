import React, { Component } from 'react';

import PollList from './PollList';

class Home extends Component {

  render() {

    return (
      <div className="Home">
        <div>
          <PollList></PollList>
        </div>
      </div>

    );
  }
}

export default Home;