import { PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  score: '',
  picture: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PLAYER:
    return [
      {
        ...state,
        name: state.action.nome,
        score: state.action.picture,
        picture: state.action.ponto,
      },
    ];
  default:
    return state;
  }
}

export default user;
