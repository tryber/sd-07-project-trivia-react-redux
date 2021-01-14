import { fetchTokenAPI } from '../services';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RESULT_TOKEN = 'RESULT_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';

const requestToken = () => (
  { type: REQUEST_TOKEN }
);

const resultToken = (payload) => (
  { type: RESULT_TOKEN, payload }
);

const failedRequest = (error) => (
  { type: FAILED_REQUEST, payload: error }
);

export default function fetchToken(callback) {
  return async (dispatch) => {
    dispatch(requestToken());
    try {
      const { token } = await fetchTokenAPI();
      await dispatch(resultToken(token));
      await callback('token', token);
    } catch (err) { dispatch(failedRequest(err)); }
  };
}
