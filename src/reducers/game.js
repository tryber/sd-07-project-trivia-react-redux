const GAME_DATA = 'GAME_DATA';
const GAME_STATUS = 'GAME_STATUS';
const GAME_SCORE = 'GAME_SCORE';

const INITIAL_STATE = {
  token: '',
  data: {},
  assertions2: false,
  time2: 0,
  score: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GAME_DATA:
    return { ...state, token: action.token, data: action.data };
  case GAME_STATUS:
    return { ...state, assertions2: action.assertions2, time2: action.time2 };
  case GAME_SCORE:
    return { ...state, score: action.score };
  default:
    return state;
  }
};

export default game;
