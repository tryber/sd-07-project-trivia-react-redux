import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import questionReducer from './questionReducer';
import tokenReducer from './tokenReducer';
import timerReducer from './timerReducer';

export default combineReducers({
  playerReducer,
  questionReducer,
  tokenReducer,
  timerReducer,
});
