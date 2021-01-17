import { combineReducers } from 'redux';

import user from './user';
import triviaToken from './triviaToken';
import triviaQuestions from './triviaQuestions';
import ranking from './ranking';
import triviaSetting from './triviaSetting';

export default combineReducers({
  user,
  triviaToken,
  triviaQuestions,
  ranking,
  triviaSetting,
});
