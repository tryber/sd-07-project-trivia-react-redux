const INITIAL_STATE = {
  token: '',
};

function tokenReducer(state = INITIAL_STATE, action) {
  const { type, token } = action;
  switch (type) {
  case 'SUCCESS':
    return { ...state, token };
  default:
    return state;
  }
}

export default tokenReducer;
