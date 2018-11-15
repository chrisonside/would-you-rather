import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isObjectEmpty } from '../utils/helper';
import { Link, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import {
  setCurrentPoll,
  clearCurrentPoll,
} from '../actions';

class Poll extends Component {

  clearSelectedPoll() {
    this.props.clearCurrentPoll();
  }

  componentDidMount() {
    let pollId = window.location.pathname;
    while(pollId.charAt(0) === '/'){
      pollId = pollId.substr(1);
      this.props.setCurrentPoll(pollId);
    }
  }

  render() {
    const { poll, isLoading, pageNotFound } = this.props;

    if(pageNotFound) {
      return <Redirect to='/page-not-found' />;
    }

    return (
      <div className='poll'>
        {isLoading &&
          <Loader
            type="Puff"
            color="#00BFFF"
            height="100"
            width="100"
          />
        }

        {!isLoading &&
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
            <Link to='/' className='poll__link' onClick={() => this.clearSelectedPoll()}>Back to polls</Link>
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
  let voteRatio = 0;
  optionObj.className = '';
  optionObj.text = obj.text;
  if(obj.votes.includes(userId)) {
    optionObj.className = 'poll__option--selected';
  }
  optionObj.voteCount = obj.votes.length;
  voteRatio = (100 / pollTotalVotes) * obj.votes.length;
  if(isNaN(voteRatio)) {
    optionObj.votePercentage = 0;
  } else {
    optionObj.votePercentage = voteRatio;
  }
  return optionObj;
}

function mapStateToProps( { users, loggedInUser, selectedPoll } ) {
  let isLoading = true;
  const poll = {};
  const pollOptions = [];
  let pageNotFound = false;


  if(!isObjectEmpty(selectedPoll)){
    if(selectedPoll.hasOwnProperty('notFound404')){
      pageNotFound = true;
      isLoading = false;
    } else {
      const optionOne = selectedPoll.optionOne;
      const optionTwo = selectedPoll.optionTwo;
      pollOptions.push(buildPollOptionsObject(optionOne, optionTwo, loggedInUser));
      pollOptions.push(buildPollOptionsObject(optionTwo, optionOne, loggedInUser));
      poll.options = pollOptions;
      if(!isObjectEmpty(users)) {
        poll.authorAvatar = users[selectedPoll.author].avatarURL;
        poll.authorName = users[selectedPoll.author].name;
      }
      isLoading = false;
    }
  }

  return {
    isLoading,
    poll,
    pageNotFound,
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