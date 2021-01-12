import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './ducks/rootReducer';

const composeEnhancers = window
  .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  })
  || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;
