const getFetch = (url) => fetch(url).then((element) => element.json());

export function fetchTokenAPI() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  return getFetch(url);
}

export function fetchTriviaAPI(token, amount = '5') {
  const url = `https://opentdb.com/api.php?amount=${Number(amount)}&token=${token}`;
  return getFetch(url);
}
