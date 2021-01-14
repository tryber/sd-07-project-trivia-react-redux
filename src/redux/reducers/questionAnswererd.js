import { QUESTION_ANSWERED } from '../actions';

const sessionInitialState = {
  isAnswered: false,
  isCorrect: false,
};

function questionAnswererd(state = sessionInitialState, action) {
  switch (action.type) {
  case QUESTION_ANSWERED:
    return { ...state,
      isAnswered: action.isAnswered,
      isCorrect: action.isCorrect,
    };
  default:
    return state;
  }
}

export default questionAnswererd;
