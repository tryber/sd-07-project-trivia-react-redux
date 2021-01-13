import { combineReducers } from 'redux';
import player from './player';
import game from './game';

export default combineReducers({
  player,
  game,
});
