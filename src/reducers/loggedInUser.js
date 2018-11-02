import {
  ADD_CURRENT_USER
} from '../actions';

export function loggedInUser(loggedInUser = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case ADD_CURRENT_USER :
      return {
        ...loggedInUser[0] = payload
      }
    default :
      return loggedInUser
    }
}