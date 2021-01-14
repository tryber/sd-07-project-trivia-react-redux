const INITIAL_STATE = { click: '' };

function colorReducer(state = INITIAL_STATE, action) {
  const { type } = action;
  switch (type) {
  case 'CLICK':
    return {
      ...state,
      click: '-clicked',
    };
  default:
    return state;
  }
}

export default colorReducer;
