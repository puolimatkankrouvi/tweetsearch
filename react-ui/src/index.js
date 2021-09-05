import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';


import {Provider} from "react-redux";
import {search_reducer} from './redux/reducers.js';
import {createStore} from 'redux';

const store = createStore(search_reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
