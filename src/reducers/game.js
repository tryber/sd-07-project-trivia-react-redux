const INITIAL_STATE = {
  timer: 30,
};

const game = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case 'saveTime':
    return ({
      ...state,
      timer: payload,
    });
  default:
    return state;
  }
};

export default game;
