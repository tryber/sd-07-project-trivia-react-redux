const QUESTION_INITIAL_STATE = {
  response_code: 0,
  results: [],
  isFetching: false,
};

function questions(state = QUESTION_INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_QUESTIONS':
    return {...state, isFetching: true};
  case 'GET_QUESTIONS':
    return { results: action.payload.results, isFetching: false};
  default:
    return state;
  }
}

export default questions;
