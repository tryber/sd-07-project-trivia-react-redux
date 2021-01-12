import { combineReducers } from 'redux';
import token from './sessionReducer';
import player from './playerReducer';

export default combineReducers({
  token,
  player,
});
