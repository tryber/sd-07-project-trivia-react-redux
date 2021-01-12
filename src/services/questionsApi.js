const fetchQuestions = async (number, token) => {
  const requestQuestions = await fetch(`https://opentdb.com/api.php?amount=${number}&token=${token}`);
  const requestJson = await requestQuestions.json();
  return requestJson;
};

export default fetchQuestions;
