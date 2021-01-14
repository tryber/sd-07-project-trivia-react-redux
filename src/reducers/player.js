const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
};

export default function player(state = initialState, action) {
  switch (action.type) {
  case 'TOKEN':
    localStorage.setItem('TOKEN', action.payload);
    return {
      ...state,
      token: action.payload,
    };

  default:
    return state;
  }
}
