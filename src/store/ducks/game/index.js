import GameTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.game;

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GameTypes.GET_QUESTION:
    return { ...state, questions: action.questions };
  default:
    return state;
  }
};

export default game;
