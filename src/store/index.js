import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers/rootReducer';
import initialState from 'reducers/initialState';

export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk)
    )
  )
}
