import types from './types';
// import apiTriviaToken from '../../services/apiTriviaToken';

export const sendLoginInfo = (payload) => (
  {
    type: types.LOGIN_INFO,
    payload,
  }
);

// export const isFetching = () => (
//   {
//     type: types.IS_FETCHING,
//   }
// );

export const requestSuccess = (token) => (
  {
    type: types.REQUEST_SUCCESS,
    token,
  }
);

// export function fetchApiToken() {
//   return async (dispatch) => {
//     dispatch(isFetching());
//     const token = await apiTriviaToken();
//     dispatch(requestSuccess(token));
//   };
// }
