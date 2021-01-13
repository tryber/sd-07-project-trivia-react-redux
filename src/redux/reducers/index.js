import { combineReducers } from 'redux';
import token from './sessionReducer';
import questionAnswererd from './questionAnswererd';
import throwTimer from './throwTimer';

export default combineReducers({
  token,
  questionAnswererd,
  throwTimer,
});
