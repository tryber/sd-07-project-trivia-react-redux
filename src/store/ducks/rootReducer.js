import { combineReducers } from 'redux';
import player from './player';
import ranking from './ranking';

export default combineReducers({
  player,
  ranking,
});
