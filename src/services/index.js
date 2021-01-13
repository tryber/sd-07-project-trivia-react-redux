const API_URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

async function fetchToken() {
  const response = await fetch(API_URL_TOKEN);
  const result = await response.json();
  return result;
}

async function fetchQuestionNAnswer(token) {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const result = await response.json();
  return result.results;
}

export { fetchToken, fetchQuestionNAnswer };
