import md5 from 'crypto-js/md5';

export default (email) => {
  const hash = md5(email);
  const hashString = hash.toString();
  const gravatarImgUrl = `https://www.gravatar.com/avatar/${hashString}`;
  return gravatarImgUrl;
};
