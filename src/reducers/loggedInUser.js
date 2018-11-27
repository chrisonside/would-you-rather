import {
  ADD_CURRENT_USER,
  UPDATE_LOGGEDIN_USER_ANSWERS,
  UPDATE_LOGGEDIN_USER_QUESTIONS,
} from '../actions';

export function loggedInUser(loggedInUser = {}, action) {
  const { payload } = action;
  console.log(payload);
  switch (action.type) {
    case ADD_CURRENT_USER :
      return {
        ...loggedInUser[0] = payload
      }
    case UPDATE_LOGGEDIN_USER_ANSWERS :
      return {
        ...loggedInUser,
          answers: {
            ...loggedInUser.answers,
            [payload.qid]: payload.answer
          }
      }
    case UPDATE_LOGGEDIN_USER_QUESTIONS :
      return {
        ...loggedInUser,
            questions: [...loggedInUser.questions,
              payload.id]
          }
    default :
      return loggedInUser
    }
}