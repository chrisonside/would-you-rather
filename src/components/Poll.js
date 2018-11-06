import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isObjectEmpty } from '../utils/helper';
import { Link } from 'react-router-dom';

import {
  setCurrentPoll,
  clearCurrentPoll,
} from '../actions';

class Poll extends Component {

  componentDidMount() {
    let pollId = window.location.pathname;
    while(pollId.charAt(0) === '/'){
      pollId = pollId.substr(1);
      this.props.setCurrentPoll(pollId);
    }
  }

  clearSelectedPoll() {
    this.props.clearCurrentPoll();
  }

  render() {
    const { poll } = this.props;

    return (
      <div className='poll'>
        {!isObjectEmpty(poll) &&
          <div>
            <p>Asked by:</p>
            <img className='poll__avatar' src={poll.authorAvatar} alt={poll.authorName} />
            <p>Would you rather</p>
            {poll.options.map((option, i) => (
              <div key={i} className={`poll__option ${option.className}`}>
                <p className='poll__text'>{option.text}</p>
                <p className='poll__count'>{option.voteCount}</p>
                <p className='poll__percentage'>{option.votePercentage}</p>
              </div>
            ))}
            <Link to='/' className='poll__link' onClick={() => this.clearSelectedPoll()}>Home</Link>
          </div>
        }
      </div>
    );
  }
}

function buildPollOptionsObject(obj, obj2, loggedInUser) {
  const optionObj = {};
  const userId = loggedInUser.id;
  const pollTotalVotes = obj.votes.length + obj2.votes.length;
  optionObj.className = '';
  optionObj.text = obj.text;
  if(obj.votes.includes(userId)) {
    optionObj.className = 'poll__option--selected';
  }
  optionObj.voteCount = obj.votes.length;
  optionObj.votePercentage = (100 / pollTotalVotes) * obj.votes.length;
  return optionObj;
}

function mapStateToProps( {users, loggedInUser, selectedPoll} ) {
  const poll = {};
  const pollOptions = [];
  const optionOne = selectedPoll.optionOne;
  const optionTwo = selectedPoll.optionTwo;

  if(!isObjectEmpty(selectedPoll)){
    pollOptions.push(buildPollOptionsObject(optionOne, optionTwo, loggedInUser));
    pollOptions.push(buildPollOptionsObject(optionTwo, optionOne, loggedInUser));
    poll.options = pollOptions;
    if(!isObjectEmpty(users)) {
      poll.authorAvatar = users[selectedPoll.author].avatarURL;
      poll.authorName = users[selectedPoll.author].name;
    }
  }

  return {
    loggedInUser,
    poll,
 }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentPoll: (poll) => dispatch(setCurrentPoll(poll)),
    clearCurrentPoll: () => dispatch(clearCurrentPoll()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Poll);