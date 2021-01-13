const INITIAL_STATE = {
  gravatar: '',
};

const gravatar = (state = INITIAL_STATE, action) => {
  const { type, hashData } = action;
  console.log(action);
  switch (type) {
  case 'fetchSucessGravatar':
    return { ...state, hashData };
  default:
    return state;
  }
};

export default gravatar;
