const initialState = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  loading: false,
  question: {
    results: [{
      category: '',
      question: '',
      correct_answer: '',
      incorrect_answers: [],
    }],
  },
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
  case 'CREATE_TOKEN_SUCCESS':
    localStorage.setItem('token', action.payload);
    return {
      ...state,
    };
  case 'REQUEST_TOKEN_API':
    return {
      ...state,
      loading: true,
    };
  case 'REQUEST_QUESTIONS_API':
    return {
      ...state,
      loading: true,
    };
  case 'REQUEST_QUESTIONS_API_SUCCESS':
    return {
      ...state,
      question: action.payload,
    };
  case 'REQUEST_QUESTIONS_API_FAIL':
    return {
      ...state,
    };
  default:
    return state;
  }
}
