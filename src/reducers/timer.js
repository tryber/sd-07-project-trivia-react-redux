const INITIAL_STATE = {
  disable: false,
  time: 30,
};

function timerReducer(state = INITIAL_STATE, action) {
  const { type } = action;
  switch (type) {
  case 'TIME_OUT':
    return {
      ...state,
      disable: true,
    };
  case 'TIME_RUNNING':
    return {
      ...state,
      time: state.time - 1,
    };
  case 'RESET':
    return {
      ...state,
      time: 30,
    };
  case 'ENABLE':
    return {
      ...state,
      disable: false,
    };
  default:
    return state;
  }
}

export default timerReducer;
