const ADD_TOKEN = 'ADD_TOKEN';
const ADD_EMAIL = 'ADD_EMAIL';
const ADD_NAME = 'ADD_NAME';

const INITIAL_STATE = {
  token: '',
  email: '',
  name: '',
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TOKEN:
    return { ...state, token: action.value };
  case ADD_EMAIL:
    return { ...state, email: action.email };
  case ADD_NAME:
    return { ...state, name: action.name };
  default:
    return state;
  }
};

export default tokenReducer;
