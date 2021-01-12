const QUESTION_INITIAL_STATE = {
  results: [],
  response_code: 0,
};

function questions(state = QUESTION_INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_QUESTIONS':
    return { results: action.payload.results };
  default:
    return state;
  }
}

export default questions;
