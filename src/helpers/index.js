export default async function getToken() {
  const endPoint = 'https://opentdb.com/api_token.php?command=request';
  const objJson = await fetch(endPoint);
  const result = objJson.json();
  return result;
}
