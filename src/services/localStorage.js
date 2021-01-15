/*
  REFERENCE:
    https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
*/
const STATE_KEY = 'state';
const TOKEN_KEY = 'token';
const RANKING_KEY = 'ranking';

const KEYS = [
  STATE_KEY,
  TOKEN_KEY,
  RANKING_KEY,
];

export const loadState = (state) => {
  try {
    KEYS.forEach((KEY) => {
      const serializedState = localStorage.getItem(KEY);
      const resultState = JSON.parse(serializedState);
      switch (KEY) {
      case STATE_KEY:
        state.user = { ...state.user, ...resultState };
        break;
      case TOKEN_KEY:
        state.triviaToken = {
          ...state.triviaToken,
          token: resultState || '',
        };
        break;
      case RANKING_KEY:
        state.ranking = {
          ranking: resultState || [],
          nextIndex: resultState ? resultState.length : 0,
        };
        break;
      default:
      }
    });
    return state;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state.user));
    localStorage.setItem(TOKEN_KEY, JSON.stringify(state.triviaToken.token));
    localStorage.setItem(RANKING_KEY, JSON.stringify(state.ranking.ranking));
  } catch (error) {
    // IGNORE WRITE ERRORS
  }
};
