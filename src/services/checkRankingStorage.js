import { getStorage } from './localStorage';

function sortReverseRanking(old) {
  return old.sort(({ score }, { score: nextScore }) => {
    const one = 1;
    if (score > nextScore) return -one;
    if (nextScore > score) return one;
    return 0;
  });
}

export default function checkDuplicatesInStorage(userScore) {
  const { name, score } = userScore;
  const oldStorageRanking = getStorage('ranking');

  if (oldStorageRanking) {
    const oldRanking = oldStorageRanking
      .filter(({ name: oldName, score: oldScore }) => {
        if (oldName !== name) return true;
        if (oldName === name && score <= oldScore) return true;
        return false;
      });
    const biggerThenNewKey = oldRanking
      .find(({ name: oldName }) => oldName === name);
    if (biggerThenNewKey) return ([...sortReverseRanking(oldRanking)]);
    return ([...sortReverseRanking([userScore, ...oldRanking])]);
  }
  return ([userScore]);
}
