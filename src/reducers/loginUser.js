const ADD_EMAIL = 'ADD_EMAIL';
const ADD_NOME = 'ADD_NOME';

const INITIAL_STATE = {
  email: '',
  name: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL:
    return { ...state, email: action.email };
  case ADD_NOME:
    return { ...state, name: action.name };
  default:
    return state;
  }
}
export default loginReducer;
