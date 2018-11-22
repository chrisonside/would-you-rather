import {
  SET_CURRENT_POLL_ID,
  CLEAR_CURRENT_POLL,
} from '../actions';

export function selectedPoll(selectedPoll = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_CURRENT_POLL_ID :
      return {
        ...selectedPoll,
        id: payload
      }
    case CLEAR_CURRENT_POLL :
      return {
        ...selectedPoll[0] = {}
      }
    default :
      return selectedPoll
    }
}