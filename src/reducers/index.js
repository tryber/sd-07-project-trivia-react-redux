import { combineReducers } from 'redux';
import userReducer from './userReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({ userReducer, gameReducer });

export default rootReducer;
