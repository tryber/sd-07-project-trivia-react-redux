const INITIAL_STATE = {
  email: '',
  name: '',
  assertions: 0,
  score: 0,
};

function userReducer(state = INITIAL_STATE, action) {
  const { type, email, name, newAssertions, newScore } = action;
  switch (type) {
  case 'LOGIN':
    return {
      ...state,
      email,
      name,
    };
  case 'UPDATE_SCORE':
    return {
      ...state, assertions: newAssertions, score: newScore,
    };
  default:
    return state;
  }
}

export default userReducer;
