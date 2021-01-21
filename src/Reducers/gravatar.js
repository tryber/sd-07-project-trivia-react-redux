import actions from '../Actions';

const INITIAL_STATE = {
  gravatar: '',
  isLoading: false,
};

function gravatarReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.REQUEST:
    return {
      ...state,
      isLoading: true,
    };
  case actions.SUCCESS:
    return {
      ...state,
      gravatar: action.gravatar,
      isLoading: false,
    };
  case actions.ERROR:
    return {
      ...state,
      gravatar: action.gravatar,
      isLoading: false,
    };
  default:
    return state;
  }
}

export default gravatarReducer;
