import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducers';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//   trace: true,
//   traceLimit: 25,
// }) || compose;

const store = createStore(rootReducer, (applyMiddleware(thunk)));

export default store;
