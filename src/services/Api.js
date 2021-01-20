const requestApi = 'https://opentdb.com/api_token.php?command=request';
// const typeMethod = { method: 'GET' };
const fetchToken = (url) => fetch(url)
  .then((data) => data.json());

const resultToken = async () => {
  const { token } = await fetchToken(requestApi);
  localStorage.setItem('token', token);

  // fetch(requestApi, typeMethod)
  //   .then((response) => response.json()
  //     .then((result) => localStorage.setItem('token', result.token)));
};

export default resultToken;
