const ADD_EMAIL = 'ADD_EMAIL';
const ADD_NAME = 'ADD_NAME';

const INITIAL_STATE = {
  email: '',
  name: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL:
    console.log({ ...state.email, email: action.email });
    return { email: action.email };
  case ADD_NAME:
    console.log({ ...state.name, name: action.name });

    return { name: action.name };
  default:
    return state;
  }
}
export default loginReducer;
