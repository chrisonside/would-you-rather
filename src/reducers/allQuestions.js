import {
  SET_ALL_QUESTIONS,
  UPDATE_QUESTION_VOTES,
} from '../actions';

// https://blog.ricardofilipe.com/post/immutable-changes-in-js
const addItem = (arr, value) => arr.concat(value);

export function allQuestions(questionsState = {}, action) {
  console.log(action);
  const { payload } = action;
  switch (action.type) {
    case SET_ALL_QUESTIONS :
      return {
        ...questionsState[0] = payload
      }
    case UPDATE_QUESTION_VOTES :
      return {
        ...questionsState,
          [payload.qid]: {
            ...questionsState[payload.qid],
            [payload.answer]: {
              ...questionsState[payload.qid][payload.answer],
              votes: [...questionsState[payload.qid][payload.answer].votes,
              payload.authedUser]
            }
          }
      }
    default :
      return questionsState
    }
}