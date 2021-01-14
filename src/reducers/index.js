import { combineReducers } from 'redux';
import receiveToken from './receiveToken';
import receiveQuestions from './receiveQuestions';

const rootReducer = combineReducers({
  receiveToken,
  receiveQuestions,
});

export default rootReducer;
