const ADD_TOKEN = 'ADD_TOKEN';
const ADD_EMAIL = 'ADD_EMAIL';
const ADD_NAME = 'ADD_NAME';
const ADD_POINT = 'ADD_POINT';
const SET_COUNTER = 'SET_COUNTER';

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

  switch (action.type) {
  case ADD_TOKEN:
    return { ...state, token: value };
  case ADD_EMAIL:
    return { ...state, email: email };
  case ADD_NAME:
    return { ...state, name: name };
  case ADD_POINT:
    const point = points + 10 + (count * difficulty);
    let assertion = state.assertions + 1
    localStorage.setItem('state',
      JSON.stringify({
        player: {
          name: state.name,
          assertions: assertion,
          score: point,
          gravatarEmail: state.email
        }
      }));
    return { ...state, points: point, assertions: assertion };
  case SET_COUNTER:
    return { ...state, count: count - 1 };
  default:
    return state;
  }
};

export default tokenReducer;
