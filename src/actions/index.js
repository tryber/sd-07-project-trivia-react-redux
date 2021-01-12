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

export const requestApi = () => ({
  type: 'REQUEST_API',
});

export function requestAPI() {
  return (dispatch) => {
    dispatch(requestMoeda());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => {
        response.json().then(
          (data) => dispatch(requestMoedaSucess(data)),
          (error) => dispatch(requestMoedaFail(error)),
        );
      });
  };
}
