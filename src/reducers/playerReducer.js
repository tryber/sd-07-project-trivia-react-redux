import { ADD_EMAIL, ADD_GAMEDATES, RELOAD_GAME } from '../actions';
import { getPicture } from '../services';

const INITIAL_STATE = {
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

export default function playerReducer(state = INITIAL_STATE, action) {
  const { score, assertions } = state;
  switch (action.type) {
  case ADD_EMAIL:
    return {
      ...state,
      gravatarEmail: getPicture(action.email),
    };
  case ADD_GAMEDATES:
    return {
      ...state,
      score: action.payload + score,
      assertions: assertions + 1,
    };
  case RELOAD_GAME:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
}
