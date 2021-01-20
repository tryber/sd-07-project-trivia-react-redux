const INITIAL_STATE = {
  token: '',
};

const token = (state = INITIAL_STATE, action) => {
  // console.log(action);
  const { type, tokenData } = action;
  switch (type) {
  case 'fetchSucessToken':
    return { ...state, tokenData };
  default:
    return state;
  }
};

export default token;
