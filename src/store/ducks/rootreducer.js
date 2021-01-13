import { combineReducers } from 'redux';

import user from './user';
import triviaToken from './triviaToken';

export default combineReducers({
  user,
  triviaToken,
});
