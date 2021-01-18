import { CORRECLY_ANSWER_SUM, LOGIN_EMAIL } from '../actions';

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
  default:
    return state;
  }
};

export default login;
