const initialState = {
  email: '',
  userName: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, email: action.payload.email, userName: action.payload.userName };
  default:
    return state;
  }
};

export default user;
