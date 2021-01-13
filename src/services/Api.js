import md5 from 'crypto-js/md5';

const requestApi = 'https://opentdb.com/api_token.php?command=request';
const typeMethod = { method: 'GET' };

export const ResultToken = () => {
  fetch(requestApi, typeMethod)
    .then((response) => response.json()
      .then((result) => localStorage.setItem('token', result.token)));
};

export const generateHash = (username, email) => {
  console.log(username);
  const emailHash = md5(email);
  const sourceEmail = `https://www.gravatar.com/avatar/${emailHash}`;
  localStorage.setItem('email', sourceEmail);
  localStorage.setItem('username', username);
};

export default ResultToken;
