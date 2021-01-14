import { fetchToken } from '../../../services';
import PlayerTypes from './types';

export const signIn = (player) => ({
  type: PlayerTypes.SIGNIN,
  payload: player,
});

export const includeToken = (token) => ({
  type: PlayerTypes.INCLUDE_TOKEN,
  token,
});

export const addScore = (score, assertions) => ({
  type: PlayerTypes.ADD_SCORE,
  score,
  assertions,
});

export function getToken() {
  return async (dispatch) => {
    const response = await fetchToken();
    const recevedToken = response.token;
    dispatch(includeToken(recevedToken));
    localStorage.setItem('token', recevedToken);
  };
}
