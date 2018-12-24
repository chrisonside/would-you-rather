import {
  SET_UNANSWERED_QUESTIONS,
} from '../actions';

export function unAnsweredQuestions(questionsState = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_UNANSWERED_QUESTIONS :
      return {
        ...questionsState[0] = payload
      }
    default :
      return questionsState
    }
}