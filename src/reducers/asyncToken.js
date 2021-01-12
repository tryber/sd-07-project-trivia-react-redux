const INITIAL_STATE = {
  token: '',
};

const token = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
  case 'fetchSucessToken':
    return { ...state, data };
  default:
    return state;
  }
};

export default token;
