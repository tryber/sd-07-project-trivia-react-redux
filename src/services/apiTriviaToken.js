const endPoint = 'https://opentdb.com/api_token.php?command=request';
const apiTriviaToken = async () => {
  const request = await fetch(endPoint);
  const response = await request.json();
  return response;
};

export default apiTriviaToken;
