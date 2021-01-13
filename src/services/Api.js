const requestApi = 'https://opentdb.com/api_token.php?command=request';
const typeMethod = { method: 'GET' };

const resultToken = () => {
  fetch(requestApi, typeMethod)
    .then((response) => response.json()
      .then((result) => localStorage.setItem('token', result.token)));
};

export default resultToken;
