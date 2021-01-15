import { combineReducers } from 'redux';
import login from './login';
import gamepage from './gamepage';

const rootReducer = combineReducers({ login, gamepage });

export default rootReducer;
