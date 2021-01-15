const INITIAL_STATE = {
  questions: [],
  category: 'random',
  difficulty: 'random',
  type: 'random',
  click: '',
  clicked: false,
  redirectToFeedback: false,
};

function questionsReducer(state = INITIAL_STATE, action) {
  const { type, newQuestions, newCategory, newDifficulty, newType } = action;
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
  case 'CHANGE_CATEGORY':
    return {
      ...state,
      category: newCategory,
    };
  case 'CHANGE_DIFFICULTY':
    return {
      ...state,
      difficulty: newDifficulty,
    };
  case 'CHANGE_TYPE':
    return {
      ...state,
      type: newType,
    };
  default:
    return state;
  }
}

export default questionsReducer;
