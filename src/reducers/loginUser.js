const ADD_EMAIL = 'ADD_EMAIL';
const ADD_NOME = 'ADD_NOME';

const INITIAL_STATE = {
  email: '',
  name: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_NOME:
      console.log({ ...state, name: action.name })
      return { ...state, name: action.name };
    case ADD_EMAIL:
      console.log( {...state, email: action.email })

      return {...state, email: action.email };
    default:
      return state;
  }
}
export default loginReducer;
