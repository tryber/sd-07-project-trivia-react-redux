import triviaTokenTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.triviaToken;

const triviaToken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case triviaTokenTypes.REQUEST:
    return {
      ...state,
      isLoading: true,
    };
  case triviaTokenTypes.RECEIVE_SUCCESS:
    return {
      ...state,
      token: action.payload,
      isLoading: false,
    };
  case triviaTokenTypes.RECEIVE_FAIL:
    return {
      ...state,
      token: action.payload,
      isLoading: false,
    };
  default:
    return state;
  }
};

export default triviaToken;
