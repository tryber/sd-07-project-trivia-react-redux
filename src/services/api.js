const API_URL = 'https://opentdb.com/api_token.php?command=request';
export const fetchToken = async () => {
  const resp = await fetch(API_URL);
  const json = await resp.json();
  if (json.response_code === 0) {
    return Promise.resolve(json.token);
  }
  return Promise.reject(json);
};

export const fetchQuests = async () => {

  const endpoint = `https://opentdb.com/api.php?amount=5&token=${localStorage.getItem('token')}`
  const resp = await fetch(endpoint);
  const json = await resp.json();
  if (json.response_code === 0) {
    return Promise.resolve(json.results);
  }
  return Promise.reject(json);

};

