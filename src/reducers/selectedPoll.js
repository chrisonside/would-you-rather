import {
  ADD_CURRENT_POLL,
  CLEAR_CURRENT_POLL,
} from '../actions';

export function selectedPoll(selectedPoll = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case ADD_CURRENT_POLL :
      return {
        ...selectedPoll[0] = payload
      }
    case CLEAR_CURRENT_POLL :
      console.log('being called');
      return {
        ...selectedPoll[0] = {}
      }
    default :
      return selectedPoll
    }
}