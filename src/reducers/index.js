const initialState = {
  name: "",
  assertions: 0,
  score: 0,
  gravatarEmail: "",
};

export default function player(state = initialState, action) {
  switch (action.type) {
    case "USER": return {
      ...state,
      gravatarEmail: action.payload,
    }

    default:
      return state;
  }
}
