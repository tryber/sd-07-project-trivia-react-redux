import { TOKEN } from '../actions/actionsTypes';

const initialState = {
  token: '',
};

const clickToken = (state = initialState, action) => {
  switch (action.type) {
  case TOKEN:
    return { ...state, token: action.token };
  default:
    return state;
  }
};

export default clickToken;
