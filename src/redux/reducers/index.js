import { combineReducers } from 'redux';
import token from './token';
import infoPlayer from './infoPlayer';

const rootReducer = combineReducers({ token, infoPlayer });

export default rootReducer;
