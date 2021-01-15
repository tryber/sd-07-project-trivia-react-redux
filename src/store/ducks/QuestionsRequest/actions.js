import { fetchQuests } from '../../../services/api';
import TaskTypes from './types';

const { REQUESTING_DATA, RECEIVED_DATA, FAILED_REQUEST, ASSERTIONS } = TaskTypes;

const requestQuestion = () => ({ type: REQUESTING_DATA });
const receiveQuestion = (quest) => ({ type: RECEIVED_DATA, quest });
const failedRequest = (error) => ({ type: FAILED_REQUEST, resp: error });

export const assertionCauting = (assertions) => ({ type: ASSERTIONS, assertions });

export const handleAsyncQuestion = () => (
  async (dispatch) => {
    try {
      dispatch(requestQuestion());
      const quest = await fetchQuests();
      return dispatch(receiveQuestion(quest));
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  }
);
