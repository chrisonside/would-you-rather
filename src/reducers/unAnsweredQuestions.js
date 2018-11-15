import {
  SET_UNANSWERED_QUESTIONS,
  // ADD_QUESTION,
} from '../actions';

export function unAnsweredQuestions(questionsState = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_UNANSWERED_QUESTIONS :
      return {
        ...questionsState[0] = payload
      }
      // case ADD_QUESTION :
      // return {
      //   ...questionsState[0],
      //     [payload.id]: ''
      // }
    default :
      return questionsState
    }
}