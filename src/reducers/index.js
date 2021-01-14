import { combineReducers } from 'redux';
import login from './login';
import user from './user';
import player from './player';

const reducer = combineReducers({ login, user, player });

export default reducer;
