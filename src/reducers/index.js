import { combineReducers } from 'redux';
import login from './login';
import questions from './questions';
import score from './score';

const rootReducer = combineReducers({
  login,
  questions,
  score,
});

export default rootReducer;
