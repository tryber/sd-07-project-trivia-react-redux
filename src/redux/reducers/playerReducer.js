import { LOGIN, ADD_SCORE } from '../../actions/playerAction';

const INITIAL_STATE = {
  name: 'user',
  assertions: 0,
  score: 0,
  emailGravatar: '',
};
const playerReducer = (state = INITIAL_STATE, action) => {
  const { type, name, emailGravatar, score, assertions } = action;
  switch (type) {
  case LOGIN:
    return ({ ...state, name, emailGravatar, score: 0, assertions: 0 });
  case ADD_SCORE:
    return ({
      ...state,
      score: state.score + score,
      assertions: state.assertions + assertions,
    });
  default:
    return state;
  }
};
export default playerReducer;
