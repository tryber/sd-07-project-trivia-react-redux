const INITIAL_STATE = {
  name: 'teste',
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  const { type, payload, score } = action;
  switch (type) {
  case 'savePlayer':
    return {
      ...state,
      name: payload,
      score,
    };
  default:
    return state;
  }
};

export default player;
