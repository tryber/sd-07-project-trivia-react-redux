import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { loginUser, triviaReducer, tokenReducer } from '../reducers';

const rootReducer = combineReducers({
  loginUser,
  triviaReducer,
  tokenReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);
export default store;
