const callAPI = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const fetchingApi = await fetch(url);
  const jsonApi = await fetchingApi.json();
  return jsonApi;
};

export default callAPI;
