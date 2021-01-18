import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import triviaReducer from './trivia.reducer';

const rootReducer = combineReducers({
  userReducer,
  triviaReducer,
});

export default rootReducer;
