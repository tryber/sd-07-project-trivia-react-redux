import types from './types';
import apiTrivia from '../../services/apiTrivia';

export const sendLoginInfo = (payload) => (
  {
    type: types.LOGIN_INFO,
    payload,
  }
);

export const isFetching = () => (
  {
    type: types.IS_FETCHING,
  }
);

export const requestSuccess = (questions) => (
  {
    type: types.REQUEST_SUCCESS,
    questions,
  }
);

export const requestTokenSuccess = (token) => (
  {
    type: types.REQUEST_TOKEN_SUCCESS,
    token,
  }
);

export const scoreUpdate = (payload) => (
  {
    type: types.SCORE_UPDATE,
    payload,
  }
);

export const resetScore = () => (
  {
    type: types.RESET_SCORE,
  }
);

export const saveTimer = (payload) => (
  {
    type: types.SAVE_TIMER,
    payload,
  }
);

export const savePicture = (payload) => (
  {
    type: types.SAVE_PICTURE,
    payload,
  }
);

export function fetchApiTrivia(token) {
  return async (dispatch) => {
    dispatch(isFetching());
    const questions = await apiTrivia(token);
    dispatch(requestSuccess(questions));
  };
}
