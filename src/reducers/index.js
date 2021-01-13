import { combineReducers } from 'redux';
import player from './playerInfo';

const rootReducer = {
  player,
};

export default combineReducers(rootReducer);
