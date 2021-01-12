import { QUESTION_ANSWERED } from '../actions';

const sessionInitialState = {
  isAnswered: false,
};

function questionAnswererd(state = sessionInitialState, action) {
  switch (action.type) {
  case QUESTION_ANSWERED:
    return { ...state, isAnswered: action.payload };
  default:
    return state;
  }
}

export default questionAnswererd;
