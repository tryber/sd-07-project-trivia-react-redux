import { UPDATE_NAME, UPDATE_EMAIL } from '../constants';

const anything = 'anything';
const userActions = {
  updateEmail: (payload) => ({ type: UPDATE_EMAIL, payload }),
  updateName: (payload) => ({ type: UPDATE_NAME, payload }),
};

export { userActions, anything };
