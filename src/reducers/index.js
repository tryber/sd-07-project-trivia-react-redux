import { combineReducers } from 'redux';
import userReducer from './user';
import gameReducer from './game';
import scoreReducer from './score';

const rootReducer = combineReducers({ userReducer, gameReducer, scoreReducer });

export default rootReducer;
