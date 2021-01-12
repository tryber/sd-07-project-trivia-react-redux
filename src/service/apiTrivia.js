export const getToken = async () => {
  const fetchRequest = await fetch(
    'https://opentdb.com/api_token.php?command=request',
  );
  const json = fetchRequest.json();
  return json;
};

export const getQuestions = async (token) => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=5&token=${token}`,
  );
  const json = response.json();
  return json;
};
