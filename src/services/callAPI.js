const callAPI = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const fetchingApi = await fetch(url);
  const jsonApi = await fetchingApi.json();
  const { token } = jsonApi.token;
  return token;
};

export default callAPI;
