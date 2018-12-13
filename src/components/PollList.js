import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { isObjectEmpty } from '../utils/helper';

import {
  clearCurrentPoll,
  collateUserAnswers
} from '../actions';

import { isArrayEmpty } from '../utils/helper';

class PollList extends Component {

  state = {
    showAnswered: false
  }

  clearSelectedPoll() {
    this.props.clearCurrentPoll();
  }

  componentDidMount() {
    console.log('pollList being remounted');
    /*
      * Handle user clicking back button to poll list from poll.
      * Clearing selectedPoll now avoids flash of old post when user clicks on another poll in future
    */
    window.onpopstate = (e) => {
      console.log('back button pressed');
      this.clearSelectedPoll();
    }

    // Note that loggedInUser has to already be set to view this component
    this.props.collateUserAnswers(this.props.loggedInUser);
  }

  /*
    * Function to toggle between answered and unanswered questions
  */
  displayAnswered(bool) {
    if (bool === this.state.showAnswered) {
      return;
    } else {
      this.setState(prevState => ({
        showAnswered: !prevState.showAnswered
      }))
    }
  }

  render() {
    const { answered } = this.props;
    const { notAnswered } = this.props;
    const { showAnswered } = this.state;
    const answersToDisplay = showAnswered ? answered : notAnswered;

    return (
      <div className={`poll-list poll-list--${showAnswered}`}>

        <div className='poll-list__toggle poll-list__toggle--answered' onClick={() => this.displayAnswered(true)}>Answered</div>
        <div className='poll-list__toggle poll-list__toggle--notanswered' onClick={() => this.displayAnswered(false)}>Not answered</div>

        {isArrayEmpty(answersToDisplay) &&
          <Loader
            type="Puff"
            color="#00ADB5"
            height="100"
            width="100"
          />
        }

        {!isArrayEmpty(answersToDisplay) && (
          <div>
            <div className='poll-list__questions'>
              <h2 className='poll-list__title'>Would you rather...</h2>
              {answersToDisplay.map((question, index) => (
                <div key={ `${question.name}-${index}`} className='poll-list__question'>
                  <h3 className='poll-list__question-title'>
                    {question.optionOne.text} or {question.optionTwo.text}
                  </h3>
                  <Link to={`/${question.id}`} className='poll-list__link'>
                      See poll details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    );
  }
}

function convertToArray(object) {
  return Object.keys(object).map(i => object[i]);
}

// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value#answer-1129270
function compareTimestamp(a,b) {
  if (a.timestamp < b.timestamp)
    return -1;
  if (a.timestamp > b.timestamp)
    return 1;
  return 0;
}

function convertToArrayAndSort(object) {
  let newArray = [];
  if(!isObjectEmpty(object)) {
    newArray = convertToArray(object).sort(compareTimestamp);
  }
  return newArray;
}

function mapStateToProps( {loggedInUser, answeredQuestions, unAnsweredQuestions} ) {
  const answered = convertToArrayAndSort(answeredQuestions);
  const notAnswered = convertToArrayAndSort(unAnsweredQuestions);

  return {
    loggedInUser,
    answered,
    notAnswered,
  }

}

// Bind dispatch to the action creators required for this component - in this case, to populate my Store with my users
function mapDispatchToProps(dispatch) {
  return {
    collateUserAnswers: (user) => dispatch(collateUserAnswers(user)),
    clearCurrentPoll: () => dispatch(clearCurrentPoll()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollList);