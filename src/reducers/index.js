import { combineReducers } from 'redux';
import userReducer from './user';
import tokenReducer from './token';
import hashReducer from './hash';
import questionsReducer from './questions';

const rootReducer = combineReducers({
  userReducer,
  tokenReducer,
  questionsReducer,
  hashReducer,
});

export default rootReducer;
