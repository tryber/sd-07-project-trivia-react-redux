import { combineReducers } from 'redux';
import Login from './Login';
import fetch from './fetch';

const reducer = combineReducers({ Login, fetch });

export default reducer;
