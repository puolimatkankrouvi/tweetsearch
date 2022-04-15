import React from 'react';
import App from './App.js';
import './index.css';
import { createRoot } from 'react-dom/client';


import {Provider} from "react-redux";
import {search_reducer} from './redux/reducers.js';
import {createStore} from 'redux';

const store = createStore(search_reducer);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
