// const token = JSON.parse(localStorage.getItem('token'));

const apiTrivia = async (token) => {
  const endPoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const request = await fetch(endPoint);
  const response = await request.json();
  return response;
};

export default apiTrivia;
