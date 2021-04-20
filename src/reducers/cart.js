import * as types from '../actions/actionTypes';
import initialState from './initialState';

export const cart = (state = initialState.cart, action) => {
  switch(action.type) {
    case types.ADD_TO_CART:
      let cart = [...state];
      cart.push(action.payload);

      return cart;

    case types.REMOVE_FROM_CART:
      return state.filter(item => item !== action.payload);

    case types.HANDLE_QUANTITY_CHANGE:
      let index = state.findIndex(item => item === action.payload.record);
      let item = [...state];

      if (action.payload.quantity !== 0) {
        item[index] = { ...item[index], quantity: action.payload.quantity };
      } else {
        item.splice(index, 1);
      }

      return item;

    default:
      return state;
  }
}
