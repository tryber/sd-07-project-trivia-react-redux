import { combineReducers } from 'redux';
import userReducer from './user';
import tokenReducer from './token';
import questionsReducer from './questions'

const rootReducer = combineReducers({
  userReducer,
  tokenReducer,
  questionsReducer,
});

export default rootReducer;
