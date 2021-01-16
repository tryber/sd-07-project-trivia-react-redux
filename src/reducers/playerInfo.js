// Esse reducer será responsável por tratar as informações da pessoa usuária

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
  const { player, type, points } = action;
  switch (type) {
  case 'LOGIN':
    return {
      ...state,
      name: player.name,
      email: player.email,
      token: player.token,
      imageSrc: player.imageSrc,
      score: 0,
      assertions: 0,
    };
  case 'CORRECT_ANSWER':
    return {
      ...state,
      score: state.score + points,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
}

export default playerReducer;
