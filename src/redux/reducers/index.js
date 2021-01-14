import { combineReducers } from 'redux';
import token from './token';
import infoPlayer from './infoPlayer';
import timer from './timer';

const rootReducer = combineReducers({ token, infoPlayer, timer });

export default rootReducer;
