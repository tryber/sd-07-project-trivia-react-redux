const BASE_API = 'https://opentdb.com';

const getQuestions = async (token) => {
  const endpoint = `${BASE_API}/api.php?amount=5&token=${token}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.results;
};

export default getQuestions;
