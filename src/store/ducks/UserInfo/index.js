import TasksTypes from './types';

const initialState = {
  name: '',
  email: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case TasksTypes.ADD:
    return { name: action.info.name, email: action.info.email };

  default:
    return state;
  }
}
