const BASE_API = 'https://opentdb.com';

const api = async () => {
  try {
    const request = await fetch(`${BASE_API}/api_token.php?command=request`);
    const json = await request.json();
    console.log(`vish ${json}`);
    return json;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default api;
