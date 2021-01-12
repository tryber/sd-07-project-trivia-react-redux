const INITIAL_STATE = {
  email: '',
  name: '',
};

function userReducer(state = INITIAL_STATE, action) {
  const { type, email, name } = action;
  switch (type) {
  case 'LOGIN':
    return {
      ...state,
      email,
      name,
    };
  default:
    return state;
  }
}

export default userReducer;
