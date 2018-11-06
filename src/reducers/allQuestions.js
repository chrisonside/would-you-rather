import {
  SET_ALL_QUESTIONS,
} from '../actions';

export function allQuestions(questionsState = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_ALL_QUESTIONS :
      return {
        ...questionsState[0] = payload
      }
    default :
      return questionsState
    }
}