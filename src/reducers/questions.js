import {
  GET_QUESTIONS
} from '../actions';

export function questions(questionsState = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case GET_QUESTIONS :
      return {
        ...questionsState[0] = payload
      }
    default :
      return questionsState
    }
}