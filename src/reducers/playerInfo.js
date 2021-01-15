// Esse reducer será responsável por tratar as informações da pessoa usuária

// import { act } from "react-dom/test-utils";

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  score: 0,
  imageSrc: '',
  assertions: 0,
  error: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  const { player, type } = action;
  switch (type) {
  case 'LOGIN':
    return {
      ...state,
      name: player.name,
      email: player.email,
      token: player.token,
      imageSrc: player.imageSrc,
      score: player.score,
    };
    case 'CHANGE_SCORE':
      return {
        ...state,
        score: action.payload
      }

  default:
    return state;
  }
}

export default playerReducer;
