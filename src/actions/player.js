export const REQUEST_PLAYER = 'REQUEST_PLAYER';
export const GET_AVATAR_PLAYER = 'GET_AVATAR_PLAYER';
export const SET_NAME = 'SET_NAME';
export const SET_ASSERTIONS = 'SET_ASSERTIONS';
export const SET_SCORE = 'SET_SCORE';
export const SET_GRAVATAR = 'SET_GRAVATAR';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const ADD_TOKEN = 'ADD_TOKEN';

export const setName = (payload) => ({
  type: SET_NAME,
  payload,
});

export const addToken = (token) => ({
  type: ADD_TOKEN,
  token,
});

export const addGravatar = (payload) => ({
  type: SET_GRAVATAR,
  payload,
});

export function thunkApiToken() {
  return async (dispatch) => {
    const resolve = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await resolve.json();
    return dispatch(addToken(json.token));
  };
};
