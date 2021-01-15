import { combineReducers } from 'redux';
import login from './login';
import player from './player';
import allplayer from './allplayer';

const reducer = combineReducers({ login, player, allplayer });

export default reducer;
