import { combineReducers } from 'redux';
import userReducer from './user';
import tokenReducer from './token';
import hashReducer from './hash';

const rootReducer = combineReducers({
  userReducer,
  tokenReducer,
  hashReducer,
});

export default rootReducer;
