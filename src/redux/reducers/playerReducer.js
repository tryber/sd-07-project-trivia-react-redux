import { SET_PLAYER, SET_SCORE } from '../actions';

const playerInitialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function playerReducer(state = playerInitialState, action) {
  switch (action.type) {
  case SET_PLAYER:
    return action.payload;
  case SET_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: action.payload !== 0 ? state.assertions + 1 : state.assertions,
    };
  default:
    return state;
  }
}

export default playerReducer;
