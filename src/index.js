import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './componets/App';
import { store } from "./reducers"
import { Provider } from 'react-redux';
import './assets/index.css'

const root = createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <App />
  </Provider>
);