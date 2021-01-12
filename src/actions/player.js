export const REQUEST_PLAYER = 'REQUEST_PLAYER';
export const GET_AVATAR_PLAYER = 'GET_AVATAR_PLAYER';
export const SET_NAME = 'SET_NAME';
export const SET_ASSERTIONS = 'SET_ASSERTIONS';
export const SET_SCORE = 'SET_SCORE';
export const SET_GRAVATAR_EMAIL = 'SET_GRAVATAR_EMAIL';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const setName = (payload) => ({
  type: REQUEST_PLAYER,
  payload,
});

function thunkApiToken() {
  return async (dispatch) => {
    try {
      dispatch();
      const token = await fetch('https://opentdb.com/api_token.php?command=request');
      const result = await token.json();
      dispatch();
    } catch (error) {
      dispatch();
    }
  };
}

export default thunkApiToken;
