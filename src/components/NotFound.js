import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ConfusedLogo from '../assets/confused.png';

import {
  clearCurrentPoll,
} from '../actions';

class NotFound extends Component {
  clearSelectedPoll() {
    this.props.clearCurrentPoll();
  }

  render() {
    return (
      <div className='not-found'>
        <img src={ConfusedLogo} className='not-found__logo' alt='Confused person'/>
        <h1 className='not-found__title'>404 - page not found</h1>
        <Link to='/' className='not-found__link' onClick={() => this.clearSelectedPoll()}>Back to polls</Link>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clearCurrentPoll: () => dispatch(clearCurrentPoll()),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NotFound);