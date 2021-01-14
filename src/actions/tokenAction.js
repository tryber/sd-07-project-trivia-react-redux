import { getToken } from '../services/api';

const ADD_TOKEN = 'ADD_TOKEN';

const createTokenAction = (tokenObj) => ({ type: ADD_TOKEN, tokenObj });

function fetchTokenAction() {
  return (dispatch) => {
    const tokenRequest = getToken()
      .then(
        (response) => dispatch(createTokenAction(response)),
      )
      .catch(
        (error) => dispatch(createTokenAction(error)),
      );
    return tokenRequest;
  };
}

export default fetchTokenAction;
export { ADD_TOKEN };
