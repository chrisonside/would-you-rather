import { combineReducers } from 'redux';

// Import reducers
import { loggedInUser } from './loggedInUser';
import { users } from './users';
import { allQuestions } from './allQuestions';
import { answeredQuestions } from './answeredQuestions';
import { unAnsweredQuestions } from './unAnsweredQuestions';
import { selectedPoll } from './selectedPoll';

export default combineReducers({
  loggedInUser,
  users,
  allQuestions,
  answeredQuestions,
  unAnsweredQuestions,
  selectedPoll,
});