import { combineReducers } from 'redux';
import user from './user';
import game from './game';

const rootReducers = combineReducers({ user, game });

export default rootReducers;
