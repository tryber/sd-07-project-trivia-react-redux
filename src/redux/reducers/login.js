import { CORRECLY_ANSWER_SUM, LOGIN_EMAIL, AVATAR_URL } from '../actions';

const LOGIN_INITIAL_STATE = {
  name: '',
  assertions: 0,
  email: '',
  score: 0,
  avatar: '',
};

function saveScoreLocalStorage(name, assertions, email, score) {
  const state = {
    player: {
      name,
      assertions,
      score,
      gravatarEmail: email,
    },
  };
  localStorage.setItem('state', JSON.stringify(state));
}
const login = (state = LOGIN_INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_EMAIL:
    return {
      ...state,
      email: action.user.email,
      name: action.user.name,
      score: 0,
      assertions: 0,
    };
  case CORRECLY_ANSWER_SUM:
    saveScoreLocalStorage(
      state.name,
      state.assertions + 1,
      state.email,
      state.score + action.score,
    );
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };
  case AVATAR_URL:
    return {
      ...state,
      avatar: action.url,
    };
  default:
    return state;
  }
};

export default login;
