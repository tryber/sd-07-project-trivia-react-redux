import { combineReducers } from 'redux';
import Login from './Login';
import fetch from './fetch';
import game from './game';

const reducer = combineReducers({ Login, fetch, game });

export default reducer;
