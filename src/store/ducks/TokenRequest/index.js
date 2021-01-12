import TaskTypes from './types';

const { REQUESTING_DATA, RECEIVED_DATA, FAILED_REQUEST } = TaskTypes;

const initialState = {
  token: '',
  isFetching: false,
  error: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case REQUESTING_DATA:
    return { ...state, isFetching: true };
  case RECEIVED_DATA:
    console.log(action.token);
    localStorage.setItem('token', action.token);
    return { ...state, token: action.token, isFetching: false };
  case FAILED_REQUEST:
    return { ...state, error: action.resp, isFetching: false };
  default:
    return state;
  }
}
