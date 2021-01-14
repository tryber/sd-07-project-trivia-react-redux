const INITIAL_STATE = {
  click: '',
  clicked: false,
};

function colorReducer(state = INITIAL_STATE, action) {
  const { type } = action;
  switch (type) {
  case 'CLICK':
    return {
      ...state,
      click: '-clicked',
      clicked: true,
    };
  default:
    return state;
  }
}

export default colorReducer;
