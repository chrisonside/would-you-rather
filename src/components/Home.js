import React, { Component } from 'react';

import UserDetails from './UserDetails';
import PollList from './PollList';

/* To do - add nav links to these */
// import AddPoll from './AddPoll';
// import Leaderboard from './Leaderboard';
// import Poll from './Poll';

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

// function mapStateToProps( {loggedInUser} ) {
//   return {
//     loggedInUser
//  }
// }

// export default connect(
//   mapStateToProps,
//   null
// )(Home);

export default Home;