import getToken from '../../../services';
import PlayerTypes from './types';

export const signIn = (player) => ({
  type: PlayerTypes.SIGNIN,
  payload: player,
});

export const requestToken = (token) => ({
  type: PlayerTypes.REQUEST_TOKEN,
  payload: token,
});

export function fetchToken() {
  return async (dispatch) => {
    const response = await getToken();
    dispatch(requestToken(response));
  };
}
