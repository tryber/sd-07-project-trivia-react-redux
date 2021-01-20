const INITIAL_STATE = {
  timer: 30,
  onLoading: 'false',
  acertos: 0,
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
  case 'acerto':
    return ({
      ...state,
      acertos: state.acertos + 1,
    });
  default:
    return state;
  }
};

export default game;
