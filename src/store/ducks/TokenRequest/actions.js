import { fetchToken } from '../../../services/api';
import TaskTypes from './types';

const { REQUESTING_DATA, RECEIVED_DATA, FAILED_REQUEST } = TaskTypes;

const requestingData = () => ({ type: REQUESTING_DATA });
const receivedData = (token) => ({ type: RECEIVED_DATA, token });
const failedRequest = (error) => ({ type: FAILED_REQUEST, resp: error });
export default function handleAsync() {
  return async (dispatch) => {
    try {
      dispatch(requestingData());
      console.log('antes');
      const token = await fetchToken();
      console.log('depois');
      return dispatch(receivedData(token));
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  };
}
