import { toastr } from 'react-redux-toastr';

import * as types from './actionTypes';

export const addToCart = payload => (
  dispatch => {
    dispatch({
      type: types.ADD_TO_CART,
      payload
    })

    toastr.success('Product Added to Cart Successfully!')
  }
)

export const removeFromCart = payload => ({
  type: types.REMOVE_FROM_CART,
  payload
})

export const handleQuantityCart = payload => ({
  type: types.HANDLE_QUANTITY_CHANGE,
  payload
})

export const showError = payload => (
  dispatch => {
    toastr.error(payload)
  }
)
