const SIGN_IN = 'SIGN_IN';

const INITIAL_STATE = {
  name: '',
  email: '',
  gravatarUrl: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SIGN_IN:
    return { ...state, name: action.name, email: action.email };
  case 'GRAVATAR_USER':
    return { ...state, gravatarUrl: action.url };
  default:
    return state;
  }
};

export default user;
