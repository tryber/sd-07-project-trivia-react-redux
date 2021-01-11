const SIGN_IN = 'SIGN_IN';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SIGN_IN:
    return { ...state, name: action.name, email: action.email };
  default:
    return state;
  }
};

export default user;
