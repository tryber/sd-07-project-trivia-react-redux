import { combineReducers } from 'redux';
import receiveToken from './receiveToken';
import receiveQuestions from './receiveQuestions';
import signIn from './signIn';

const rootReducer = combineReducers({
  receiveToken,
  receiveQuestions,
  signIn,
});

export default rootReducer;
