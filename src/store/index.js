import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { loginReducer, triviaReducer, tokenReducer } from '../reducers';

const rootReducer = combineReducers({
  loginReducer,
  triviaReducer,
  tokenReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);
export default store;
