import {
  SET_USERS,
  UPDATE_USER_ANSWERS,
} from '../actions';

// users = {
// tylermcginnis: {
//   id: 'tylermcginnis',
//   answers: {
//     "vthrdm985a262al8qx3do": 'optionOne',
//     "xj352vofupe1dqz9emx13r": 'optionTwo',
//   },

// state.first.second[someId].fourth
// users.user.answers[qid]

// console.log(authedUser, qid, answer);

// function updateVeryNestedField(usersState = {}, payload) {
//   return {
//     ...usersState,
//     [authedUser]: {
//       ...usersState[authedUser],
//       answers: {
//         ...usersState[authedUser].answers,
//         [payload.qid]: payload.answer
//       }
//     }
//   }
// }

export function users(usersState = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_USERS :
      return {
        ...usersState[0] = payload
      }
      // NOTE - THE REDUX SHAPE MIGHT BE DIFFERENT
    case UPDATE_USER_ANSWERS :
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
    default :
      return usersState
    }
}