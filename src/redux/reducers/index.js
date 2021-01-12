import { combineReducers } from 'redux';
import token from './sessionReducer';
import questionAnswererd from './questionAnswererd';

export default combineReducers({
  token,
  questionAnswererd,
});
