import triviaSettingTypes from './types';

const request = () => ({
  type: triviaSettingTypes.REQUEST,
});

const receiveSuccess = (categories) => ({
  type: triviaSettingTypes.RECEIVE_SUCCESS,
  payload: categories,
});

const receiveFail = (error) => ({
  type: triviaSettingTypes.RECEIVE_FAIL,
  payload: error,
});

export const setFilter = (filter) => ({
  type: triviaSettingTypes.SET_FILTER,
  payload: filter,
});

export default {
  request,
  receiveSuccess,
  receiveFail,
};
