export function user(email) {
  return ({
    type: 'USER',
    payload: email,
  });
}

export const tokenAPI = (dataToken) => ({
  type: 'TOKEN',
  payload: dataToken,
});

export const getAPIToken = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();

  dispatch(tokenAPI(data.token));
};
