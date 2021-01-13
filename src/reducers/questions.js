import { QUESTIONS } from '../actions/actionsTypes';

const initialState = {
  questions: [],
  loading: false,
};

const questionsGen = (state = initialState, action) => {
  switch (action.type) {
  case QUESTIONS:
    return { ...state, questions: action.questions, loading: action.loading };
  default:
    return state;
  }
};

export default questionsGen;
