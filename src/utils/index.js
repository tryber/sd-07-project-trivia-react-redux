import md5 from 'crypto-js/md5';

export const generateHash = (username, email) => {
  const emailHash = md5(email);
  const sourceEmail = `https://www.gravatar.com/avatar/${emailHash}`;
  localStorage.setItem('email', sourceEmail)
  localStorage.setItem('username', username)
}