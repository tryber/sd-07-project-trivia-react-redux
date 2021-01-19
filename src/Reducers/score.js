import actions from '../Actions';

const INITIAL_STATE = {
  score: 0,
  correctAnswers: 0,
};

function scoreReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case (actions.UPDATE_SCORE):
    console.log(action);
    return {
      ...state, score: action.score, correctAnswers: state.correctAnswers + 1,
    };
  case (actions.RESET_SCORE):
    return { ...state, score: 0, correctAnswers: 0 };
  default:
    return state;
  }
}

export default scoreReducer;
