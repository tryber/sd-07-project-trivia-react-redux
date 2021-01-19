import { combineReducers } from 'redux';
import user from './user';
import gravatar from './gravatar';
import score from './score';

export default combineReducers({
  user,
  gravatar,
  score,
});
