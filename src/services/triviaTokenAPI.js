const TRIVIA_TOKEN_API = 'https://opentdb.com';

const getToken = async () => {
  const tokenRequest = await fetch(`${TRIVIA_TOKEN_API}/api_token.php?command=request`);
  const tokenJson = await tokenRequest.json();
  return tokenJson;
};

export default getToken;
