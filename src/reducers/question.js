import { QUESTION } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case QUESTION:
    return { ...state, questions: action.questions };
  default:
    return state;
  }
}
