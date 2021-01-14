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
  const { player, type } = action;
  switch (type) {
  case 'LOGIN':
    const { name, email, token, imageSrc } = player;
    return {
      ...state,
      name,
      email,
      token,
      imageSrc,
    };
  default:
    return state;
  }
}

export default playerReducer;
