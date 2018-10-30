import * as API from '../data/_DATA.js';
import { arrayToObject } from '../utils/helper';

// Set up constants - these are exported to reducers
export const GET_USERS = 'GET_USERS';
export const GET_ANSWERED_QUESTIONS = 'GET_ANSWERED_QUESTIONS';
export const GET_UNANSWERED_QUESTIONS = 'GET_UNANSWERED_QUESTIONS';
export const ADD_CURRENT_USER = 'ADD_CURRENT_USER';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const SAVE_ANSWER  = 'SAVE_ANSWER';

/*
  *
  * All thunk action creators utilise this particular action creator to speak to the reducers
  *
*/
export const updateReduxStore = (payload, type) => ({
  payload,
  type
});

// Export thunked up action creators for use by components - using thunk releases redux from its synchronous confines
export const getUsers = () => dispatch => (
  API
  ._getUsers()
  .then(users => dispatch(updateReduxStore(users, GET_USERS)))
);

export const getQuestions = (user) => dispatch => (
  API
  ._getQuestions()
  .then(questions => {
    const answeredQuestions = {};
    const unAnsweredQuestions = {};
    console.log(questions);
    // Loop through questions
    for (var question in questions) {
      // For each question (E.g. 8xf0y6ziyjabvozdd253nd)
      if (questions.hasOwnProperty(question)) {
        // If user.answers.question exists, add question to answered and call reducer
        if(user.answers[question]) {
          answeredQuestions[question] = questions[question];
          // And add their answer
          answeredQuestions[question].userAnswer = user.answers[question];
        } else {
          // Else add question to unanswered, and call reducer
          unAnsweredQuestions[question] = questions[question];
        }
      }
    }
    dispatch(updateReduxStore(answeredQuestions, GET_ANSWERED_QUESTIONS));
    dispatch(updateReduxStore(unAnsweredQuestions, GET_UNANSWERED_QUESTIONS))
  })
);

export const addCurrentUser = (user) => dispatch => (
  dispatch(updateReduxStore(user, ADD_CURRENT_USER))
)