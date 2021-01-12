const initialState = {
  name: '',
  assertions,
  score,
  gravatarEmail,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case 'CHANGE_NAME':
    return {
      ...state,
      name: action.payload,
    };
  case 'CHANGE_ASSERTIONS':
    return {
      ...state,
      assertions: action.payload,
    };
  case 'CHANGE_SCORE':
    return {
      ...state,
      score: action.payload,
    };
  case 'CHANGE_EMAIL':
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case 'REQUEST_API':
    return {
      ...state,
      loading: true,
    };
  default:
    return state;
  }
}
