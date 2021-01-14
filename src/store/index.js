import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import token from '../reducer';

const rootReducer = combineReducers({ token });

const composeEnhancers = window
.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  trace: true,
  traceLimit: 25,
})
|| compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
// const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
