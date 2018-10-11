import {
  GET_USERS
} from '../actions';

export function users(usersState = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case GET_USERS :
      return {
        ...usersState[0] = payload
      }
    default :
      return usersState
    }
}