import { GET_TOKEN } from '../Actions';

const INITIAL_STATE = {
  token: '',
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
};

export default tokenReducer;
