export const fetchQuestions = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const request = await fetch(URL);
  const response = await request.json();
  return response.results;
};

export const console = (c) => {
  console.log(c);
};
