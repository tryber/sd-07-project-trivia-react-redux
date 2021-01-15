/*
  REFERENCE:
    https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
*/
const STATE_KEY = 'state';
const TOKEN_KEY = 'token';

const KEYS = [
  STATE_KEY,
  TOKEN_KEY,
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
      default:
      }
    });
    return state;
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state.user));
    localStorage.setItem(TOKEN_KEY, JSON.stringify(state.triviaToken.token));
  } catch (error) {
    // IGNORE WRITE ERRORS
  }
};
