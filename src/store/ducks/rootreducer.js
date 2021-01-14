import { combineReducers } from 'redux';

import user from './user';
import triviaToken from './triviaToken';
import triviaQuestions from './triviaQuestions';

export default combineReducers({
  user,
  triviaToken,
  triviaQuestions,
});
