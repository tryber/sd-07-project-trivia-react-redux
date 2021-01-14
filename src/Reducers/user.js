import { USER_NAME } from '../Actions/index';

const INITIAL_STATE = {
  name: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_NAME:
    return {
      ...state,
      name: action.name,
    };
  // case USER_IMAGE:
  //   return {
  //     ...state,
  //     image: action.image,
  //   };
  // case USER_SCORE:
  //   return {
  //     ...state,
  //     score: action.score,
  //   };
  default:
    return state;
  }
}

export default userReducer;
