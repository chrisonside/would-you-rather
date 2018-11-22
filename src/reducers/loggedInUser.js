import {
  ADD_CURRENT_USER,
  UPDATE_USER_ANSWERS,
} from '../actions';

export function loggedInUser(loggedInUser = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case ADD_CURRENT_USER :
      return {
        ...loggedInUser[0] = payload
      }
    case UPDATE_USER_ANSWERS :
      return {
        ...loggedInUser,
          answers: {
            ...loggedInUser.answers,
            [payload.qid]: payload.answer
          }
      }
    default :
      return loggedInUser
    }
}