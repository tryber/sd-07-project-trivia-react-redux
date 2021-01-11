import { combineReducers } from 'redux';
import login from './login';
import play from './play';

const reducer = combineReducers({ login });

export default reducer;
