const QUESTION_INITIAL_STATE = {
  response_code: 0,
  results: [],
  time: 30,
};

function questions(state = QUESTION_INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_QUESTIONS':
    return { ...state, response_code: action.payload.response_code, results: action.payload.results };
  case 'SET_TIME':
    return { ...state, time: action.time };
  default:
    return state;
  }
}

export default questions;
