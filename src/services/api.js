const endpointToken = 'https://opentdb.com/api_token.php?command=request';

const apiToken = async () => {
  try {
    const request = await fetch(endpointToken);
    const response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
};

export default apiToken;
