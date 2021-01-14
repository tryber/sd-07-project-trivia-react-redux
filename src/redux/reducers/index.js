import { combineReducers } from 'redux';
import login from './login';
import play from './play';

const rootReducer = combineReducers({ login, play });

export default rootReducer;
