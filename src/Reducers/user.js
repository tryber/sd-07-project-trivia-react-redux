import actions from '../Actions';

const INITIAL_STATE = {
  name: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.USER_NAME:
    return {
      ...state,
      name: action.name,
    };
  default:
    return state;
  }
}

export default userReducer;
