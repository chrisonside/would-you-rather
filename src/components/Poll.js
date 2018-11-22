import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isObjectEmpty } from '../utils/helper';
import { Link, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import {
  setCurrentPollId,
  clearCurrentPoll,
  collateUserAnswers,
  saveVote,
} from '../actions';

class Poll extends Component {

  clearSelectedPoll() {
    this.props.clearCurrentPoll();
  }

  voteInPoll(selection) {
    const vote = {
      authedUser: this.props.loggedInUser.id,
      qid: this.props.poll.id,
      answer: selection
    }
    // console.log(this.props.loggedInUser.id, this.props.poll.id, selection);
    this.props.saveVote(vote);
  }

  componentDidMount() {
    // Set the currentPoll from the id in the URL
    let pollId = window.location.pathname;
    while(pollId.charAt(0) === '/'){
      pollId = pollId.substr(1);
      this.props.setCurrentPollId(pollId);
    }
    // If they've landed fresh on this page, grab users' answered questions data too
    if(isObjectEmpty(this.props.allQuestions)){
      this.props.collateUserAnswers(this.props.loggedInUser);
    }

  }

  render() {
    const { loggedInUser, isLoading, userAnsweredPoll, poll, pageNotFound, } = this.props;

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
                <p className='poll__percentage'>{option.votePercentage}%</p>
                {!userAnsweredPoll &&
                  <button className='poll__vote' onClick={() => this.voteInPoll(option.optionName)}>{`Vote for ${option.optionName}!`}</button>
                }
              </div>
            ))}
            <Link to='/' className='poll__link' onClick={() => this.clearSelectedPoll()}>Back to polls</Link>
          </div>
        }
      </div>
    );
  }
}

function buildPollOptionsObject(obj, obj2, loggedInUser, name) {
  const optionObj = {};
  const userId = loggedInUser.id;
  const pollTotalVotes = obj.votes.length + obj2.votes.length;
  let voteRatio = 0;
  optionObj.optionName = name;
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

function mapStateToProps( { users, loggedInUser, allQuestions, selectedPoll } ) {

  let isLoading = true;
  let pageNotFound = false;
  let userAnsweredPoll = false;
  let poll = {};
  const pollOptions = [];

  if(!isObjectEmpty(selectedPoll) && !isObjectEmpty(allQuestions)){
    const pollId = selectedPoll.id;
    // If this poll id does not exist, 404
    if(typeof allQuestions[pollId] === 'undefined'){
      pageNotFound = true;
      isLoading = false;
    } else {
      // First grab the details for the poll
      let selectedPoll = allQuestions[pollId];
      const optionOne = selectedPoll.optionOne;
      const optionTwo = selectedPoll.optionTwo;
      // Now create the cleaner poll object we'll use in the render
      pollOptions.push(buildPollOptionsObject(optionOne, optionTwo, loggedInUser, 'optionOne'));
      pollOptions.push(buildPollOptionsObject(optionTwo, optionOne, loggedInUser, 'optionTwo'));
      poll.options = pollOptions;
      poll.id = selectedPoll.id;
      if(loggedInUser.answers[pollId]){
        poll.userAnswer = loggedInUser.answers[pollId];
        userAnsweredPoll = true;
      }
      if(!isObjectEmpty(users)) {
        poll.authorAvatar = users[selectedPoll.author].avatarURL;
        poll.authorName = users[selectedPoll.author].name;
      }
      isLoading = false;
    }
  }

  return {
    loggedInUser,
    pageNotFound,
    userAnsweredPoll,
    isLoading,
    poll,
    allQuestions,
 }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentPollId: (pollId) => dispatch(setCurrentPollId(pollId)),
    clearCurrentPoll: () => dispatch(clearCurrentPoll()),
    collateUserAnswers: (user) => dispatch(collateUserAnswers(user)),
    saveVote: (userId, questionId, answer) => dispatch(saveVote(userId, questionId, answer)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Poll);