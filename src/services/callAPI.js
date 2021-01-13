
export const requestToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const fetchingApi = await fetch(url);
  const jsonApi = await fetchingApi.json();
  return jsonApi;
};

export const requestQuestions = async (token) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const fetchingApi = await fetch(url);
  const jsonApi = await fetchingApi.json();
  return jsonApi;
};

