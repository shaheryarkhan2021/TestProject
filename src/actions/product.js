import * as types from './actionTypes';

export const fetchProduct = payload => ({
  type: types.FETCH_PRODUCT,
  payload
})

export const changeProductQuantity = payload => ({
  type: types.CHANGE_PRODUCT_QUANTITY,
  payload
})

export const fetchProductSuccess = payload => ({
  type: types.FETCH_PRODUCT_SUCCESS,
  payload
})

export const fetchProductFailure = payload => ({
  type: types.FETCH_PRODUCT_FAILURE,
  payload
})
