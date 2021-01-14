import { combineReducers } from 'redux';
import player from './playerInfo';
import timer from './timer';
import color from './changeColor';

const rootReducer = {
  player,
  timer,
  color,
};

export default combineReducers(rootReducer);
