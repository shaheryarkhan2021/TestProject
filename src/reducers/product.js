import * as types from '../actions/actionTypes';
import initialState from './initialState';

export const product = (state = initialState.product, action) => {
  switch(action.type) {
    case types.FETCH_PRODUCT:
      return { ...state, product: action.payload };

    case types.CHANGE_PRODUCT_QUANTITY:
      const values = action.payload;

      let index = state.sizes.findIndex(size => size.id === values.sizeId)
      let sizes = [...state.sizes];

      let size = sizes[index]
      let color = size.colors.find(c => c.name === values.colorId)
      color.quantity = color.quantity - values.quantity

      sizes[index] = {
        ...state.sizes[index],
        color: [...state.sizes[index].colors]
      }

      return { ...state, sizes: sizes };

    default:
      return state;
  }
};
