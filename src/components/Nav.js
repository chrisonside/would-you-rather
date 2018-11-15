import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  clearCurrentPoll,
} from '../actions';

class Nav extends Component {

  constructor (props) {
    super(props);
  }

  /*
    * Cater for user interacting with nav whilst on poll page
    * Avoids a flash of previous current poll when a new poll is eventually selected
  */
  clearSelectedPoll() {
    this.props.clearCurrentPoll();
  }

  render() {
    return (
      <div className='nav'>
        <Link to='/' className='nav__link' onClick={() => this.clearSelectedPoll()}>Polls</Link>
        <Link to="/leaderboard" className="nav__link" onClick={() => this.clearSelectedPoll()}>Leaderboard</Link>
        <Link to="/add" className="nav__link" onClick={() => this.clearSelectedPoll()}>Add Poll</Link>
      </div>
    );
  }
}

// Bind dispatch to the action creators required for this component - in this case, to populate my Store with my users
function mapDispatchToProps(dispatch) {
  return {
    clearCurrentPoll: () => dispatch(clearCurrentPoll()),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Nav);