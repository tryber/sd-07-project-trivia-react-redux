import types from '../actions/types';

const GAME_INITIAL_STATE = {
  questions: {},
  isLoading: false,
};

const game = (state = GAME_INITIAL_STATE, action) => {
  switch (action.type) {
  case types.IS_FETCHING:
    return ({
      ...state,
      isLoading: true,
    });
  case types.REQUEST_SUCCESS:
    return ({
      ...state,
      questions: action.questions,
      isLoading: false,
    });
  default:
    return state;
  }
};

export default game;
