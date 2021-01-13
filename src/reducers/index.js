import { combineReducers } from 'redux';
import login from './login';
import game from './game';

const reducer = combineReducers({ login, game });

export default reducer;
