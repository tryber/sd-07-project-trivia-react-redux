export const REQUEST_NEW_PLAYER = 'REQUEST_NEW_PLAYER';
export const SET_SCORE = 'SET_SCORE';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const ADD_TOKEN = 'ADD_TOKEN';
export const SET_ASSERTIONS = 'SET_ASSERTIONS';
export const ADD_RANKING = 'ADD_RANKING';

export const addToken = (token) => ({
  type: ADD_TOKEN,
  token,
});

export const addPlayer = (player) => ({
  type: REQUEST_NEW_PLAYER,
  player,
});

export const setAssertions = (assertions) => ({
  type: SET_ASSERTIONS,
  assertions,
});

export const setScore = (score) => ({
  type: SET_SCORE,
  score,
});

export const addRanking = (ranking) => ({
  type: ADD_RANKING,
  ranking,
})

export function thunkApiToken() {
  return async (dispatch) => {
    const resolve = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await resolve.json();
    return dispatch(addToken(json.token));
  };
}
