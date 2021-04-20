import * as types from '../actions/actionTypes';
import initialState from './initialState';

export const currency = (state = initialState.currency, action) => {
  switch(action.type) {
    case types.CHANGE_CURRENCY:
      return action.payload

    default:
      return state;
  }
}
