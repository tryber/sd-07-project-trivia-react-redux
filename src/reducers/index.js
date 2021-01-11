import { combineReducers } from 'redux';
import trivia from './trivia';
import user from './user';

const reducer = combineReducers({ trivia, user });

export default reducer;
