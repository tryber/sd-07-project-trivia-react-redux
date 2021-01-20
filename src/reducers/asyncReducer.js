const INITIAL_STATE = {
  questions: '',
};
const question = (state = INITIAL_STATE, action) => {
  const { type, questions } = action;
  switch (type) {
  case 'fetchSucessQuestion':
    return { ...state, questions: [...questions] };
  default:
    return state;
  }
};

export default question;
