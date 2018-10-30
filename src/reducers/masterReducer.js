import { combineReducers } from 'redux';

// Import reducers
import { loggedInUser } from './loggedInUser';
import { users } from './users';
import { answeredQuestions } from './answeredQuestions';
import { unAnsweredQuestions } from './unAnsweredQuestions';

export default combineReducers({
  loggedInUser,
  users,
  answeredQuestions,
  unAnsweredQuestions,
});