import * as types from '../actions/actionTypes';
import initialState from './initialState';

export const modal = (state = initialState.modal, action) => {
  switch(action.type) {
    case types.TOGGLE_MODAL:
      return { isOpen: !state.isOpen, type: action.payload }

    default:
      return state;
  }
}
