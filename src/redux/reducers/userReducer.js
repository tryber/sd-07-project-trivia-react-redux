import { SET_USER_DATA } from '../actions/userActions';

const initialState = {
  token: '',
  avatarUrl: '',
  userName: '',
  email: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_USER_DATA:
    return {
      ...state,
      token: action.data.token,
      userName: action.data.name,
      email: action.data.email,
      avatarUrl: action.data.imgUrl,
    };
  default:
    return state;
  }
};

export default userReducer;
