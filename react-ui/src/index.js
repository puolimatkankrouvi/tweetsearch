import React from 'react';
import App from './App.js';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import { createRoot } from 'react-dom/client';


import {Provider} from "react-redux";
import searchReducer from './redux/reducers.js';

const store = configureStore({
  reducer: {
    searchTab: searchReducer,
  },
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
