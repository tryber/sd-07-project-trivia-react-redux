const INITIAL_STATE = {
    questions: [],
    isFetching: true
  };
  
  function questionsReducer(state = INITIAL_STATE, action) {
    const { type } = action;
    switch (type) {
    case 'REQUEST_QUESTIONS':
      return { ...state, isFetching: true };
    case 'SUCCESS':
      return { ...state, questions: action.questions, isFetching: false }
    case 'ERROR':
      return { ...state, error: action.error}
    default:
      return state;
    }
  }
  
  export default questionsReducer;
  