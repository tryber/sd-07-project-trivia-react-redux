import { SAVE_QUESTIONS, SET_STATE_PLAYER } from '../actions';

const INITIAL_STATE = {
  questions: [],
  statePlayer: {
    nome: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return { ...state, questions: action.questions };
  case SET_STATE_PLAYER:
    return {
      ...state,
      statePlayer: {
        nome: action.statePlayer.player.nome,
        assertions: action.statePlayer.player.assertions,
        score: action.statePlayer.player.score,
        gravatarEmail: action.statePlayer.player.gravatarEmail,
      } };
  default: return state;
  }
};

export default gameReducer;
