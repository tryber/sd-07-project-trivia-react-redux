import { combineReducers } from 'redux';
import player from './playerInfo';
import timer from './timer';
import questions from './questions';

const rootReducer = {
  player,
  timer,
  questions,
};

export default combineReducers(rootReducer);
