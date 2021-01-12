async function getToken() {
  const endPoint = 'https://opentdb.com/api_token.php?command=request';
  const objJson = await fetch(endPoint);
  const result = objJson.json(); // Não usamos await
  return result;
}

async function getQuestions(token) {
  const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const objJson = await fetch(endpoint);
  const result = await objJson.json();
  return result;
}

export default { getToken, getQuestions };
