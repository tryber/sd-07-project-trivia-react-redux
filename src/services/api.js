const endPointToken = 'https://opentdb.com/api_token.php?command=request';

const requestToken = async () => {
  try {
    const request = await fetch(endPointToken);
    const response = await request.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default requestToken;
