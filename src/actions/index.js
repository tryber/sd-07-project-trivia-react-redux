const ADD_TOKEN = 'ADD_TOKEN';
const ADD_EMAIL = 'ADD_EMAIL';
const ADD_NAME = 'ADD_NAME';

export const addEmailAction = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const addNameAction = (name) => ({
  type: ADD_NAME,
  name,
});

export const tokenAction = (value) => ({ type: ADD_TOKEN, value });
