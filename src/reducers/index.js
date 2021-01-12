import { combineReducers } from 'redux';
import receiveToken from './receiveToken';

const rootReducer = combineReducers({
  receiveToken,
});

export default rootReducer;
