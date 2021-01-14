import { combineReducers } from 'redux';

import UserInfo from './UserInfo';
import TokenRequest from './TokenRequest';
import QuestionRequest from './QuestionsRequest';
import Score from './Score';

export default combineReducers({
  UserInfo, TokenRequest, QuestionRequest, Score,
});
