import { combineReducers } from 'redux';

// Import reducers
import { loggedInUser } from './loggedInUser';
import { users } from './users';
import { questions } from './questions';

export default combineReducers({
  loggedInUser,
  users,
  questions,
});