import {
  UPDATE_NAME,
  UPDATE_EMAIL,
  REQUEST_SUCESS,
  REQUEST_FAIL,
  UPDATE_TIME } from '../constants';

const userActions = {
  updateEmail: (payload) => ({ type: UPDATE_EMAIL, payload }),
  updateName: (payload) => ({ type: UPDATE_NAME, payload }),
};

const gameActions = {
  requestSucess: (payload) => ({ type: REQUEST_SUCESS, payload }),
  requestFail: (payload) => ({ type: REQUEST_FAIL, payload }),
  updateTime: (payload) => ({ type: UPDATE_TIME, payload }),
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
