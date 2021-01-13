import { combineReducers } from 'redux';
import token from './sessionReducer';
import questionAnswererd from './questionAnswererd';
import throwTimer from './throwTimer';
import player from './playerReducer';

export default combineReducers({
  token,
  questionAnswererd,
  throwTimer,
  player,
});
