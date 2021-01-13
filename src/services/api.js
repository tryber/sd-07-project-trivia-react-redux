const endPointToken = 'https://opentdb.com/api_token.php?command=request';

const requestToken = async () => {
  try {
    const request = await fetch(endPointToken);
    const response = await request.json();
    return response;
  } catch (error) {
    console.alert(error);
  }
};

export default requestToken;
