const API_URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export default async function fetchToken() {
  const response = await fetch(API_URL_TOKEN);
  const result = await response.json();
  return result;
}
