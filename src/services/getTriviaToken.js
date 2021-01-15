export default async () => {
  const BASE_API = 'https://opentdb.com';

  try {
    const request = await fetch(`${BASE_API}/api_token.php?command=request`);
    const token = await request.json();
    return token.token;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
