const ADD_TOKEN = 'ADD_TOKEN';
const ADD_EMAIL = 'ADD_EMAIL';
const ADD_NAME = 'ADD_NAME';
const ADD_POINT = 'ADD_POINT';
const SET_COUNTER = 'SET_COUNTER';
const RESET_COUNTER = 'RESET_COUNTER';

const INITIAL_STATE = {
  token: '',
  email: '',
  name: '',
  points: 0,
  count: 30,
  assertions: 0,
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  const { value, email, name, difficulty } = action;
  const { count, points } = state;
  const assertValue = 10;
  const point = points + assertValue + (count * difficulty);
  const assertion = state.assertions + 1;

  switch (action.type) {
  case ADD_TOKEN:
    return { ...state, token: value };
  case ADD_EMAIL:
    return { ...state, email };
  case ADD_NAME:
    return { ...state, name };
  case ADD_POINT:
    localStorage.setItem('state',
      JSON.stringify({
        player: {
          name: state.name,
          assertions: assertion,
          score: point,
          gravatarEmail: state.email,
        },
      }));
    return { ...state, points: point, assertions: assertion };
  case SET_COUNTER:
    return { ...state, count: count - 1 };
  case RESET_COUNTER:
    return { ...state, count: 30 };
  default:
    return state;
  }
};

export default tokenReducer;
