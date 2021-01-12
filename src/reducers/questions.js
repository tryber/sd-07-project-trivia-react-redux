const INITIAL_STATE = {
  questions: {},
};

function questionsReducer(state = INITIAL_STATE, action) {
  const { type, questions } = action;
  switch (type) {
  case 'QUESTIONS_SUCCESS':
    return { ...state, questions };
  default:
    return state;
  }
}

export default questionsReducer;
