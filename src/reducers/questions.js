import { QUESTIONS } from '../actions/actionsTypes';

const initialState = {
  questions: [],
};

const questionsGen = (state = initialState, action) => {
  switch (action.type) {
  case QUESTIONS:
    return { ...state, questions: action.questions };
  default:
    return state;
  }
};

export default questionsGen;
