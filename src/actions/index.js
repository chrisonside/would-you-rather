import * as API from '../data/_DATA.js';
import { arrayToObject } from '../utils/helper';

// Set up constants - these are exported to reducers
export const GET_USERS = 'GET_USERS';
export const GET_QUESTIONS = 'GET_QUESTIONS';
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

export const getQuestions = () => dispatch => (
  API
  ._getQuestions()
  .then(questions => dispatch(updateReduxStore(questions, GET_QUESTIONS)))
);

export const addCurrentUser = (user) => dispatch => (
  dispatch(updateReduxStore(user, ADD_CURRENT_USER))
)