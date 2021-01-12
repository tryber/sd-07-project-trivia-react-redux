const ADD_TOKEN = 'ADD_TOKEN';

const INITIAL_STATE = '';
const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TOKEN:
    return action.value;
  default:
    return state;
  }
};

export default tokenReducer;
