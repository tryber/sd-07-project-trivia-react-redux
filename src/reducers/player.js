const INITIAL_STATE = {
  name: 'teste',
};

const player = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case 'savePlayer':
    return {
      ...state,
      name: payload,
    };
  default:
    return state;
  }
};

export default player;
