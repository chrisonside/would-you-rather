import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isObjectEmpty } from '../utils/helper';
import { Link } from 'react-router-dom';

import {
  // getQuestions,
  // addCurrentPoll,
  setUserAndQuestions
} from '../actions';

import { isArrayEmpty } from '../utils/helper';

class PollList extends Component {

  state = {
    showAnswered: false
  }

  componentDidMount() {
    this.props.setUserAndQuestions(this.props.loggedInUser);
  }

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
      <div className={`pollist pollist--${showAnswered}`}>
        <div className='polllist__toggle polllist__toggle--answered' onClick={() => this.displayAnswered(true)}>Answered</div>
        <div className='polllist__toggle polllist__toggle--notanswered' onClick={() => this.displayAnswered(false)}>Not answered</div>
        {!isArrayEmpty(answersToDisplay) && (
          <div>
            <div className='pollist__questions'>
              <h2 className='pollist__title'>Would you rather...</h2>
              {answersToDisplay.map((question, index) => (
                <div key={ `${question.name}-${index}`} className='pollist__question'>
                  <p className='pollist__question-title'>
                    {question.optionOne.text} or {question.optionTwo.text}
                  </p>
                  <Link to={`/${question.id}`} className='pollist__link'>
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

function prepData(object) {
  let newArray = [];
  if(!isObjectEmpty(object)) {
    newArray = convertToArray(object).sort(compareTimestamp);
  }
  return newArray;
}

// Format shape of store data for this component
function mapStateToProps( {loggedInUser, answeredQuestions, unAnsweredQuestions} ) {
  const answered = prepData(answeredQuestions);
  const notAnswered = prepData(unAnsweredQuestions);

  return {
    loggedInUser,
    answered,
    notAnswered,
  }

}

// Bind dispatch to the action creators required for this component - in this case, to populate my Store with my users
function mapDispatchToProps(dispatch) {
  return {
    // getQuestions: (user) => dispatch(getQuestions(user)),
    // addCurrentPoll: (poll) => dispatch(addCurrentPoll(poll)),
    setUserAndQuestions: (user) => dispatch(setUserAndQuestions(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollList);