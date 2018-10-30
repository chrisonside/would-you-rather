import {
  GET_ANSWERED_QUESTIONS,
} from '../actions';

export function answeredQuestions(questionsState = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case GET_ANSWERED_QUESTIONS :
      return {
        ...questionsState[0] = payload
      }
    default :
      return questionsState
    }
}