import triviaSettingTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.triviaSetting;

const triviaSetting = (state = INITIAL_STATE, action) => {
  console.log('RED INITIAL ACTION:', action);
  console.log('RED INITIAL STATE:', state);
  switch (action.type) {
  case triviaSettingTypes.REQUEST:
    return {
      ...state,
      isLoading: true,
    };
  case triviaSettingTypes.RECEIVE_SUCCESS:
    return {
      ...state,
      categories: action.payload,
      isLoading: false,
    };
  case triviaSettingTypes.RECEIVE_FAIL:
    return {
      ...state,
      categories: [{ id: 0, name: 'error' }],
      isLoading: false,
    };
  case triviaSettingTypes.SET_FILTER:
    return {
      ...state,
      filter: { ...action.payload },
      isLoading: false,
    };
  default:
    return state;
  }
};

export default triviaSetting;
