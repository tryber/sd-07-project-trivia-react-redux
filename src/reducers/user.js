const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  const { type, email } = action;
  switch (type) {
  case 'LOGIN':
    return { ...state, email };
  default:
    return state;
  }
}

export default userReducer;
