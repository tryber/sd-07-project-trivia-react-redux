const { Switch } = require("react-router-dom");

const initialState = {
  name: '',
};

const player = (state = initialState, action) {
switch (action.type) {
    case 'LOGIN':
        return { name: action.name }
    default:
        return state;
}
}

export default player;