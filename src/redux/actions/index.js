export const GET_TOKEN = 'GET_TOKEN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const ACC_COUNTER = 'ACC_COUNTER';
export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_EMAIL = 'SAVE_EMAIL';

export const counterTime = (timer) => ({ type: ACC_COUNTER, timer });
export const saveName = (name) => ({ type: SAVE_NAME, name });
export const saveEmail = (email) => ({ type: SAVE_EMAIL, email });

function getToken(json) {
  return { type: GET_TOKEN, tokenCode: json };
}

function requestToken() {
  return { type: REQUEST_TOKEN };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, token: error };
}

export const fetchToken = () => async (dispatch) => {
  try {
    dispatch(requestToken());
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const requestJson = await request.json();
    localStorage.setItem('token', requestJson.token);
    return dispatch(getToken(requestJson));
  } catch (error) {
    return dispatch(failedRequest(error));
  }
};
