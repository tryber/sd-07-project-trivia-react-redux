const requestApi = 'https://opentdb.com/api.php?amount=5&token=';

const questionsRequest = async (token) => {
  const response = await fetch(`${requestApi}${token}`);
  const data = await response.json();
  const questions = data.results;
  console.log(questions);
  return questions;
};

export default questionsRequest;
