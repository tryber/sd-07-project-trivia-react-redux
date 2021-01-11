export async function fetchTrivia() {
  const data = await fetch('https://opentdb.com/api_token.php?command=request');
  const dataJson = await data.json();
  const requestedToken = dataJson.token;
  const data2 = await fetch(`https://opentdb.com/api.php?amount=5&token=${requestedToken}`);
  return await data2.json();
}

export async function fetchToken() {
  return '';
}
