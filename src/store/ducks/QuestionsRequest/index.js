import TaskTypes from './types';

const { REQUESTING_DATA, RECEIVED_DATA, FAILED_REQUEST, ASSERTIONS } = TaskTypes;

const initialState = {
  quest: [],
  isFetching: false,
  error: '',
  assertions: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case REQUESTING_DATA:
    return { ...state, isFetching: true };
  case RECEIVED_DATA:
    return { ...state, quest: action.quest, isFetching: false };
  case FAILED_REQUEST:
    return { ...state, error: action.resp };
  case ASSERTIONS:
    return { ...state, assertions: action.assertions };
  default:
    return state;
  }
}
