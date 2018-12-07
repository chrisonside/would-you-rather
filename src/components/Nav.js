import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  clearCurrentPoll,
} from '../actions';

class Nav extends Component {
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
        <NavLink to='/' exact className='nav__link' activeClassName='nav__link--active' onClick={() => this.clearSelectedPoll()}>Polls</NavLink>
        <NavLink to='/leaderboard' exact className='nav__link' activeClassName='nav__link--active' onClick={() => this.clearSelectedPoll()}>Leaderboard</NavLink>
        <NavLink to='/add' exact className='nav__link' activeClassName='nav__link--active' onClick={() => this.clearSelectedPoll()}>Add Poll</NavLink>
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

// https://stackoverflow.com/questions/44129789/using-connect-from-react-redux-makes-navlinks-from-react-router-not-work
export default connect(
  null,
  mapDispatchToProps,
  undefined,
  { pure: false }
)(Nav);