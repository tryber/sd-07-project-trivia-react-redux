const endPointToken = 'https://opentdb.com/api_token.php?command=request';

export const requestToken = async () => {
  try {
    const request = await fetch(endPointToken);
    const response = await request.json();
    localStorage.setItem('token', JSON.stringify(response.token));
  } catch (error) {
    console.alert(error);
  }
};

export const requestQuestions = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await request.json();
    return response;
  } catch (error) {
    console.alert(error);
  }
};
