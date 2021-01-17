import md5 from 'crypto-js/md5';

export default function getPicture(email = 'null@null.com') {
  let emailClean = email.trim();
  emailClean = emailClean.toLowerCase();
  const hash = md5(emailClean);
  const url = `https://www.gravatar.com/avatar/${hash}`;
  return url;
}
