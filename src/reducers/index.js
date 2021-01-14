import { combineReducers } from 'redux';
import player from './player';
import questions from './questions';

const rootReducers = combineReducers({
  player,
  questions,
});

export default rootReducers;
