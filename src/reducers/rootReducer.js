import { combineReducers } from 'redux'

import { product } from './product'
import { modal } from './modal'
import { cart } from './cart'
import { currency } from './currency'

import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  modal: modal,
  product: product,
  cart: cart,
  currency: currency,
  toastr: toastrReducer
});

export default rootReducer;
