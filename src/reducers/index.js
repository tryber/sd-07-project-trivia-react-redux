import { combineReducers } from 'redux';
import player from './player';
import question from './question';

const rootReducers = combineReducers({ player, question });

export default rootReducers;
