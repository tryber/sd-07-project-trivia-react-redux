export const GET_TOKEN = 'GET_TOKEN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';

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
    const tokenResponse = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenJson = await tokenResponse.json();
    return dispatch(getToken(tokenJson));
  } catch (error) {
    return dispatch(failedRequest(error));
  }
};
