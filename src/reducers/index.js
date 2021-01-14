import { combineReducers } from 'redux';
import receiveToken from './receiveToken';
import signIn from './signIn';

const rootReducer = combineReducers({
  receiveToken,
  signIn,
});

export default rootReducer;
