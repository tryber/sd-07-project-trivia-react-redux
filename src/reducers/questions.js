const INITIAL_STATE = {
  questions: [],
  click: '',
  clicked: false,
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
  default:
    return state;
  }
}

export default questionsReducer;
