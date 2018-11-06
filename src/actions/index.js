import * as API from '../data/_DATA.js';

// Set up constants - these are exported to reducers
export const SET_USERS = 'SET_USERS';
export const SET_ALL_QUESTIONS = 'SET_ALL_QUESTIONS';
export const SET_ANSWERED_QUESTIONS = 'SET_ANSWERED_QUESTIONS';
export const SET_UNANSWERED_QUESTIONS = 'SET_UNANSWERED_QUESTIONS';
export const ADD_CURRENT_USER = 'ADD_CURRENT_USER';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const SAVE_ANSWER  = 'SAVE_ANSWER';
export const ADD_CURRENT_POLL = 'ADD_CURRENT_POLL';
export const CLEAR_CURRENT_POLL = 'CLEAR_CURRENT_POLL';

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
  .then(users => dispatch(updateReduxStore(users, SET_USERS)))
);

export const setUserAndQuestions = (user) => dispatch => (
  API
  ._getQuestions()
  .then(questions => {
    const answeredQuestions = {};
    const unAnsweredQuestions = {};
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
    dispatch(updateReduxStore(questions, SET_ALL_QUESTIONS));
    dispatch(updateReduxStore(answeredQuestions, SET_ANSWERED_QUESTIONS));
    dispatch(updateReduxStore(unAnsweredQuestions, SET_UNANSWERED_QUESTIONS))
    // dispatch(updateReduxStore(user, ADD_CURRENT_USER))
  })
);

export const addCurrentUser = (user) => dispatch => (
  dispatch(updateReduxStore(user, ADD_CURRENT_USER))
)

export const setCurrentPoll = (pollId) => dispatch => (
  API
  ._getQuestions()
  .then(questions => {
    const currentPoll = questions[pollId];
    dispatch(updateReduxStore(currentPoll, ADD_CURRENT_POLL))
  })
);

export const clearCurrentPoll = () => dispatch => (
  dispatch(updateReduxStore({}, CLEAR_CURRENT_POLL))
);