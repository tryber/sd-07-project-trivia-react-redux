const ADD_TOKEN = 'ADD_TOKEN';
const ADD_EMAIL = 'ADD_EMAIL';
const ADD_NAME = 'ADD_NAME';
const ADD_POINT = 'ADD_POINT';
const SET_COUNTER = 'SET_COUNTER';

export const addEmailAction = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const addNameAction = (name) => ({
  type: ADD_NAME,
  name,
});

export const tokenAction = (value) => ({ type: ADD_TOKEN, value });

export const addPoint = (difficulty) => ({
  type: ADD_POINT,
  difficulty,
});

export const setCounter = () => ({
  type: SET_COUNTER,
});
