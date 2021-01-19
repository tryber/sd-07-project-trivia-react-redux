const INITIAL_STATE = {
  timer: 30,
  onLoading: 'false',
};

const game = (state = INITIAL_STATE, action) => {
  const { type, payload, onLoad } = action;
  switch (type) {
  case 'saveTime':
    return ({
      ...state,
      timer: payload,
      onLoading: onLoad,
    });
  default:
    return state;
  }
};

export default game;
