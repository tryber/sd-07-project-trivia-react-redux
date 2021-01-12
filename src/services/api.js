const endpointToken = 'https://opentdb.com/api_token.php?command=request';
const endpointQuestions = 'https://opentdb.com/api.php?amount=5&token=$';

export const apiToken = async () => {
  try {
    const request = await fetch(endpointToken);
    const response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
};

export const apiQuestions = async (token) => {
  try {
    const request = await fetch(`${endpointQuestions}${token}`);
    const response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
};
