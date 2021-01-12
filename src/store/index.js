import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import asyncReducer from '../reducers/asyncReducer';
import asyncToken from '../reducers/asyncToken';

const composeEnhancer = (
  typeof window !== 'undefined'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
  data: asyncReducer,
  token: asyncToken,
});

function storeConfig() {
  return createStore(reducers, composeEnhancer(applyMiddleware(thunk)));
}

export default storeConfig;
