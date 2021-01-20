const initialState = {
  email: '',
  userName: '',
  avatar: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case 'SAVE_AVATAR':
    return { ...state, avatar: action.payload };
  case 'LOGIN':
    return { ...state, email: action.payload.email, userName: action.payload.userName };
  default:
    return state;
  }
};

export default user;
