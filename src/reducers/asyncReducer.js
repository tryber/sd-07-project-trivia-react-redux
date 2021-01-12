const INITIAL_STATE = {
  questions: '',
};

const question = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
  case 'fetchSucessQuestion':
    return { ...state, data };
  default:
    return state;
  }
};

export default question;
