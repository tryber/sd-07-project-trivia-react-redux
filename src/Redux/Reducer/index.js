import { combineReducers } from 'redux';
import token from './token';
import user from './user';
import score from './score';

const rootReducer = combineReducers({
  token,
  user,
  score,
});

export default rootReducer;
