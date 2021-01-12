const ADD_EMAIL = 'ADD_EMAIL';

const INITIAL_STATE = {
  email: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL:
    return { email: action.email };
  default:
    return state;
  }
}
export default loginReducer;
