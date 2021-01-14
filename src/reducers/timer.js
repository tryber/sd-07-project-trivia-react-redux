const INITIAL_STATE = { disable: false };

function timerReducer(state = INITIAL_STATE, action) {
  const { type } = action;
  switch (type) {
  case 'TIME_OUT':
    return {
      ...state,
      disable: true,
    };
  default:
    return state;
  }
}

export default timerReducer;
