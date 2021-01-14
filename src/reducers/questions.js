const initialState = {
  results: [],
};

export default function questions(state = initialState, action) {
  switch (action.type) {
  case 'questions':
    return {
      ...state,
      results: action.payload,
    };

  default:
    return state;
  }
}
