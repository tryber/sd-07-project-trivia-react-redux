export const getToken = () => new Promise((resolve, reject) => {
  const api = 'https://opentdb.com/api_token.php?command=request';
  fetch(api)
    .then((response) => response.json().then((data) => resolve(data.token)))
    .catch((error) => reject(error));
});

export const getQuestions = () => {};
