import { combineReducers } from 'redux';

import userReducer from './user';
import gameReducer from './game';

const rootReducer = combineReducers({ userReducer, gameReducer });

export default rootReducer;
