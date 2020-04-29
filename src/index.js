import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Audit from "./COMPONENTS/Audit"
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {appReducer} from "./REDUX/rootReducer";
import data from "./COMPONENTS/data"
const store = createStore(appReducer)
ReactDOM.render(
  <Provider store={store}>
      <Audit />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
