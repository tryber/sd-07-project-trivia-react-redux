import md5 from 'crypto-js/md5';

export function readLocalState() {
  const readState = JSON.parse(localStorage.getItem('state'));
  return readState;
}

export function readLocalRanking() {
  const readRanking = JSON.parse(localStorage.getItem('ranking'));
  return readRanking;
}

export function fetchGravatar(email) {
  const hashEmail = md5(email);
  const endPoint = `https://www.gravatar.com/avatar/${hashEmail}`;
  return endPoint;
}
