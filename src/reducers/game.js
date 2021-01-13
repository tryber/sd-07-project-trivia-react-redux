const GAME_DATA = 'GAME_DATA';
// const GAME_STATUS = 'GAME_STATUS';

const INITIAL_STATE = {
  token: '',
  data: {},
  // assertions: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GAME_DATA:
    return { ...state, token: action.token, data: action.data };
  // case GAME_STATUS:
  //   return { ...state, assertions: action.assertions };
  default:
    return state;
  }
};

export default game;
