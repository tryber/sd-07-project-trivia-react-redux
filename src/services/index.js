const API_URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export default async function getToken() {
  const response = await fetch(API_URL_TOKEN);
  return response.json().token;
}
