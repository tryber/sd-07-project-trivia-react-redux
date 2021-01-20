const initialState = {
  questionIndex: 0,
  questions: [],
  score: 0,
  wins: 0,
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case 'SAVE_TRIVIA':
    return { ...state, questions: action.payload };
  case 'NEXT_TRIVIA':
    return { ...state, questionIndex: state.questionIndex + 1 };
  case 'CHANGE_SCORE':
    return { ...state, score: action.payload, wins: state.wins + 1 };
  default:
    return state;
  }
};

export default user;
