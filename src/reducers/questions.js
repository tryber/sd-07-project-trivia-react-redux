const INITIAL_STATE = {
  questions: [],
  isFetching: true,
  hash: '',
};

function questionsReducer(state = INITIAL_STATE, action, hash) {
  const { type } = action;
  switch (type) {
  case 'REQUEST_QUESTIONS':
    return { ...state, isFetching: true, hash };
  case 'SUCCESS':
    return { ...state, questions: action.questions, isFetching: false, hash };
  case 'ERROR':
    return { ...state, error: action.error };
  default:
    return state;
  }
}

export default questionsReducer;
