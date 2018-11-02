import {
  SET_USERS
} from '../actions';

export function users(usersState = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_USERS :
      return {
        ...usersState[0] = payload
      }
    default :
      return usersState
    }
}