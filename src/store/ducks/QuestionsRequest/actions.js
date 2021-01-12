import { fetchQuests } from '../../../services/api';
import TaskTypes from './types';

const { REQUESTING_DATA, RECEIVED_DATA, FAILED_REQUEST } = TaskTypes;

const requestQuestion = () => ({ type: REQUESTING_DATA });
const receiveQuestion = (quest) => ({ type: RECEIVED_DATA, quest });
const failedRequest = (error) => ({ type: FAILED_REQUEST, resp: error });

export default function handleAsyncQuestion() {
  return async (dispatch) => {
    try {
      dispatch(requestQuestion());
      const quest = await fetchQuests();
      return dispatch(receiveQuestion(quest))
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  };
} 
