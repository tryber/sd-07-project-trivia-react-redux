const tokenGenerator = () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  return fetch(URL)
    .then((response) => {
      response.json();
    })
    .then((obj) => {
      const { token } = obj;
      // ENVIAR O TOKEN PARA O LOCALSTORAGE
      return localStorage.setItem('token', token);
    })
    .catch((error) => {
      console.log(error);
    });
};

// ENVIAR O TOKEN PARA O REDUX

export default tokenGenerator;
