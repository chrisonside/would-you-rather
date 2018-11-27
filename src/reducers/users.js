import {
  SET_USERS,
  UPDATE_LOGGEDIN_USER_ANSWERS,
  UPDATE_USER_QUESTIONS
} from '../actions';

export function users(usersState = {}, action) {
  const { payload } = action;
  console.log(payload);
  switch (action.type) {
    case SET_USERS :
      return {
        ...usersState[0] = payload
      }
    case UPDATE_LOGGEDIN_USER_ANSWERS :
      return {
        ...usersState,
          [payload.authedUser]: {
            ...usersState[payload.authedUser],
            answers: {
              ...usersState[payload.authedUser].answers,
              [payload.qid]: payload.answer
            }
          }
      }
      case UPDATE_USER_QUESTIONS :
      return {
        ...usersState,
          [payload.author]: {
            ...usersState[payload.author],
            questions: [...usersState[payload.author].questions,
              payload.id]
          }
        }
    default :
      return usersState
    }
}