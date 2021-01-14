import { combineReducers } from 'redux';
import user from './user';
import gravatar from './gravatar';

export default combineReducers({
  user,
  gravatar,
});
