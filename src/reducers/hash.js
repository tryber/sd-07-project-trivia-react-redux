const INITIAL_STATE = {
  hash: '',
};

function hashReducer(state = INITIAL_STATE, action) {
  const { type, hash } = action;
  switch (type) {
  case 'HASH_ACTION':
    return { ...state, hash };
  default:
    return state;
  }
}

export default hashReducer;
