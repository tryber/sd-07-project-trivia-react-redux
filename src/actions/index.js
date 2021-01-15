import {
  NEW_PLAYER,
  REQUEST_SUCESS,
  REQUEST_FAIL,
  UPDATE_SCORE,
} from '../constants';

const userActions = {
  newPlayer: (name, email) => ({ type: NEW_PLAYER, name, email }),
};

const gameActions = {
  requestSucess: (payload) => ({ type: REQUEST_SUCESS, payload }),
  requestFail: (payload) => ({ type: REQUEST_FAIL, payload }),
  updateScore: (payload) => ({ type: UPDATE_SCORE, payload }),
};

const fetchApi = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const endpoint = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const objct = await endpoint.json();

    dispatch(gameActions.requestSucess(objct.results));
  } catch (error) {
    dispatch(gameActions.requestFail(error));
  }
};

export { userActions, gameActions, fetchApi };
