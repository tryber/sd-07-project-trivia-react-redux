export const fetchQuestions = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const request = await fetch(URL);
  const response = await request.json();
  return response.results;
};

export const fetchToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(URL);
  const response = await request.json();
  const { token } = response;
  localStorage.setItem('token', token);
  return token;
};

export const console = (c) => {
  console.log(c);
};
