import { combineReducers } from 'redux';

import token from './token';
import player from './player';

export default combineReducers({
  token,
  player,
});
