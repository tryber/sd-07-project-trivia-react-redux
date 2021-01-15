const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
};

function userReducer(state = INITIAL_STATE, action) {
  const { type, email, name, newScore } = action;
  switch (type) {
  case 'LOGIN':
    return {
      ...state,
      email,
      name,
    };
  case 'UPDATE_SCORE':
    return {
      ...state, score: newScore,
    };
  default:
    return state;
  }
}

export default userReducer;
