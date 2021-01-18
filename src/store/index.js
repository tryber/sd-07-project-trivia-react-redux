import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk, logger), devToolsEnhancer()),
);

export default store;
