export const changeName = (payload) => ({
  type: 'CHANGE_NAME',
  payload,
});

export const changeAssertions = (payload) => ({
  type: 'CHANGE_ASSERTIONS',
  payload,
});

export const changeScore = (payload) => ({
  type: 'CHANGE_SCORE',
  payload,
});

export const changeGravatarEmail = (payload) => ({
  type: 'CHANGE_EMAIL',
  payload,
});

const tokenToStoreSucess = (payload) => ({
  type: 'CREATE_TOKEN_SUCCESS',
  payload,
});

const tokenToStoreFail = (error) => ({
  type: 'CREAT_TOKEN_FAIL',
  error,
});

export const requestApiToken = () => ({
  type: 'REQUEST_TOKEN_API',
});

export function requestToken() {
  return (dispatch) => {
    dispatch(requestApiToken());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => {
        response.json().then(
          (data) => dispatch(tokenToStoreSucess(data.token)),
          (error) => dispatch(tokenToStoreFail(error)),
        );
      });
  };
}
