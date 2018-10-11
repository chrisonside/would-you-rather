import { combineReducers } from 'redux';

// Import reducers
import { users } from './users';
import { loggedInUser } from './loggedInUser';

export default combineReducers({
  loggedInUser,
  users,
});