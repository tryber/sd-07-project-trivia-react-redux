import { setStorage } from '../services/localStorage';

const ADD_EMAIL = 'ADD_EMAIL';
const ADD_NOME = 'ADD_NOME';
const ADD_ASSERTIONS = 'ADD_ASSERTIONS';
const ADD_SCORE = 'ADD_SCORE';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};
function playerReducer(state = INITIAL_STATE, action) {
  setStorage('player', INITIAL_STATE);

  switch (action.type) {
  case ADD_EMAIL:
    setStorage('player', {
      ...state,
      player: { ...state.player, gravatarEmail: action.email },
    });
    return {
      ...state,
      player: { ...state.player, gravatarEmail: action.email },
    };
  case ADD_NOME:
    setStorage('player', {
      ...state,
      player: { ...state.player, name: action.name },
    });
    return { ...state, player: { ...state.player, name: action.name } };
  case ADD_ASSERTIONS:
    setStorage('player', {
      ...state.player,
      assertions: state.player.assertions + action.assertions,
    });
    return {
      ...state.player,
      player: {
        ...state.player,
        assertions: state.player.assertions + action.assertions,
      },
    };
  case ADD_SCORE:
    setStorage('player', {
      ...state.player,
      score: state.player.score + action.payload,
    });
    return {
      ...state.player,
      player: { ...state.player, score: state.player.score + action.payload },
    };
  default:
    return state;
  }
}
export default playerReducer;
