export async function fetchToken() {
  const data = await fetch('https://opentdb.com/api_token.php?command=request');
  const dataJson = await data.json();
  const requestedToken = dataJson.token;
  return requestedToken;
}

export async function fetchTrivia(requestedToken) {
  const data2 = await fetch(
    `https://opentdb.com/api.php?amount=5&token=${requestedToken}`,
  );
  const data2Json = await data2.json();
  return data2Json;
}
