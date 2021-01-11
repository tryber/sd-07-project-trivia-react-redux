import TasksTypes from './types';

const initialState = {
  nome: '',
  email: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case TasksTypes.ADD:
    return { name: action.info.nome, email: action.info.email };

  default:
    return state;
  }
}
