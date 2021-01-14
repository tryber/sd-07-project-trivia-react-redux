const INITIAL_STATE = {
  email: '',
  name: '',
  actualScore: 0,
};

function userReducer(state = INITIAL_STATE, action) {
  const { type, email, name, score } = action;
  switch (type) {
  case 'LOGIN':
    return {
      ...state,
      email,
      name,
    };
  case 'UPDATE_SCORE':
    return {
      ...state, actualScore: score,
    };
  default:
    return state;
  }
}

export default userReducer;
