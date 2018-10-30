import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isObjectEmpty } from '../utils/helper';

import {
  getQuestions
} from '../actions';

import { isArrayEmpty } from '../utils/helper';

class PollList extends Component {

  state = {
    displayUnanswered: true
  }

  // Populate users data in Redux Store - the store update will trigger a rerender
  componentDidMount() {
    this.props.getQuestions(this.props.loggedInUser);
  }

  toggleQuestions() {
    console.log('toggled');
    // Need to update this as it depends on the previous state so needs a different format
    // this.setState({ displayUnanswered: true });
  }

  render() {
    const { answered } = this.props;
    const { notAnswered } = this.props;
    const { displayUnanswered } = this.state;

    const answersToDisplay = displayUnanswered ? notAnswered : answered;

    return (
      <div>
        <div className='polllist__toggle' onClick={this.toggleQuestions}>Toggle questions</div>
        {!isArrayEmpty(answersToDisplay) && (
          <div className='pollist'>
            <div className='pollist__questions'>
              {answersToDisplay.map((question, index) => (
                <div>
                  <h2 className='pollist__title'>Would you rather...</h2>
                  <div key={ `${question.name}-${index}`} className='pollist__question'>
                    <p className='pollist__question-title'>
                      {question.optionOne.text}
                      <br />
                      or
                      <br />
                      {question.optionTwo.text}
                    </p>
                    {/* <a className='pollist__link' data-question={question.id} onClick={this.handleUserSelection}></a> */}
                  </div>
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
  let newArray = convertToArray(object);
  return newArray.sort(compareTimestamp);
}

// Format shape of store data for this component
function mapStateToProps( {loggedInUser, answeredQuestions, unAnsweredQuestions} ) {
  let answered = [];
  let notAnswered = [];
  if(!isObjectEmpty(answeredQuestions)) {
    answered = prepData(answeredQuestions);
  }
  if(!isObjectEmpty(unAnsweredQuestions)) {
    notAnswered = prepData(unAnsweredQuestions);
  }

  return {
    answered,
    notAnswered,
    loggedInUser
  }

}

// Bind dispatch to the action creators required for this component - in this case, to populate my Store with my users
function mapDispatchToProps(dispatch) {
  return {
    getQuestions: (user) => dispatch(getQuestions(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollList);