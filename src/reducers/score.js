import { POINTS, ASSERTION } from '../actions/actionsTypes';

const initialState = {
  points: 0,
  assertions: 0,
};

const scoreGen = (state = initialState, action) => {
  switch (action.type) {
  case POINTS:
    return { ...state, points: action.points };
  case ASSERTION:
    return { ...state, assertions: state.assertions + action.assertions };
  default:
    return state;
  }
};

export default scoreGen;
