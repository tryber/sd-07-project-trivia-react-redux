import { combineReducers } from 'redux';
import login from './login';
import token from './token';
import questions from './questions';

const rootReducer = combineReducers({
  login,
  token,
  questions,
});

export default rootReducer;
