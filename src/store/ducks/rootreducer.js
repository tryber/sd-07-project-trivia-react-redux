import { combineReducers } from 'redux';

import user from './user';
import triviaToken from './triviaToken';
import triviaQuestions from './triviaQuestions';
import ranking from './ranking';

export default combineReducers({
  user,
  triviaToken,
  triviaQuestions,
  ranking,
});
