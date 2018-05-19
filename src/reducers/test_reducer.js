import { FETCH_TEST } from '../actions/types';

// returns boolean
export default function(state={}, action) {
  switch (action.type) {
    case FETCH_TEST:
      return {...state, test: action.payload};
    default: break;
  }
  return state;
}