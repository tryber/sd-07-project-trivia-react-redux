import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loadState, saveState } from '../services/localStorage';
import initialState from './ducks/initialState';

import rootReducer from './ducks/rootreducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState(initialState);

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk)),
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
