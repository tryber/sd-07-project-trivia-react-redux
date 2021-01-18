const initialState = 0;

function reducer(state = initialState, action) {
  switch (action.type) {
  case 'score/ADD_SCORE':
    return action.score;
  case 'score/FAILED_SCORE':
    return { state, error: action.resp };
  default:
    return state;
  }
}

export default reducer;
