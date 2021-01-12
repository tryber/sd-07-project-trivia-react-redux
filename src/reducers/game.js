const GAME_DATA = 'GAME_DATA';

const INITIAL_STATE = {
  token: '',
  data: {},
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GAME_DATA:
    return { ...state, token: action.token, data: action.data };
  default:
    return state;
  }
};

export default game;
