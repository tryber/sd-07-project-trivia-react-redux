const INITIAL_STATE = {
  questions: [],
  click: '',
  clicked: false,
  redirectToFeedback: false,
};

function questionsReducer(state = INITIAL_STATE, action) {
  const { type, newQuestions } = action;
  switch (type) {
  case 'CLICK':
    return {
      ...state,
      click: '-clicked',
      clicked: true,
    };
  case 'NEXT_QUESTION':
    return {
      ...state,
      click: '',
      clicked: false,
      questions: newQuestions,
    };
  case 'REDIRECT_FEEDBACK':
    return {
      ...state,
      redirectToFeedback: true,
    };
  default:
    return state;
  }
}

export default questionsReducer;
