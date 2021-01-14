const INITIAL_STATE = [{
  name: '',
  email: '',
  score: 0,
}];

const signIn = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_PLAYER':
    return {
      ...state,
      name: action.name,
      email: action.email,
      score: action.score,
    };
  default:
    return state;
  }
};

export default signIn;
