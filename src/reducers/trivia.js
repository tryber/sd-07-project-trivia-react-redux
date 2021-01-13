const initialState = {
  questions: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case 'SAVE_TRIVIA':
    return { ...state, questions: action.payload };
  default:
    return state;
  }
};

export default user;
