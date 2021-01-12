import { combineReducers } from 'redux';
import token from './token';
import user from './user';

const rootReducer = combineReducers({
  token,
  user,
});

export default rootReducer;
