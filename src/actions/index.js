import getToken from '../helpers';

export const TOKEN = 'TOKEN';

const play = (token) => ({
  type: TOKEN,
  payload: token,
});

export function fetchTokenAction() {
  return (dispatch) => getToken()
    .then((token) => dispatch(play(token)));
}
