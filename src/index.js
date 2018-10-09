import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import masterReducer from './reducers/masterReducer';
// import registerServiceWorker from './serviceWorkers/registerServiceWorker';

// Combine middleware and redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create our Redux store. Pass in master reducer function, redux dev tools and middleware
const newStore = createStore(
  masterReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

/*
* Expose Redux store to root component using Provider from React Redux bindings
* Wrap App in React Router's BrowserRouter component, which listens to changes in App's URL and notifies other components
*/
ReactDOM.render(
  <Provider store={newStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// To do in future - registerServiceWorker();
