import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    // this.setState({ displayUnanswered: true });
  }

  render() {
    const { answeredArray } = this.props;
    const { unansweredArray } = this.props;
    const { displayUnanswered } = this.state;

    const answersToDisplay = displayUnanswered ? unansweredArray : answeredArray;

    return (
      <div>
        <div className='polllist__toggle' onClick={this.toggleQuestions}>Toggle questions</div>
        {!isArrayEmpty(answersToDisplay) && (
          <div className='pollist'>
            <h2 className='pollist__title'>Questions</h2>
            <div className='pollist__questions'>
              {answersToDisplay.map((question, index) => (
                <div key={ `${question.name}-${index}`} className='pollist__question'>
                  <h3 className='pollist__question-title'>{question.id}</h3>
                  {/* <a className='pollist__link' data-question={question.id} onClick={this.handleUserSelection}></a> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

// Format shape of store data for this component
function mapStateToProps( {questions, loggedInUser} ) {

  /*  Convert questions from Redux store's object format to an array, for easy looping over in UI */
  let answeredArray = [];
  let unansweredArray = [];

  if(questions) {
    let objectKeys = [Object.keys(questions)];
    objectKeys[0].map((objKey) => {
      console.log(questions[objKey].userAnswer);
      if(questions[objKey].userAnswer) {
        answeredArray.push(questions[objKey]);
      } else {
        unansweredArray.push(questions[objKey]);
      }
    });

    // Up to here! Maybe look at creating 2 objects in the store instead (via the actions file).
    // Before making decision, look at other metrics I'll need and see if store structure works. e.g. percentage of users gave what answer...
  }

  return {
    answeredArray,
    unansweredArray,
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