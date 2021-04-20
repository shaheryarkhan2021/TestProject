import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import configureStore from 'store'

const hist = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
