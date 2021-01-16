import { getStorage } from './localStorage';

function sortRanking(old) {
  return old.sort((a, b) => {
    const one = 1;
    if (a.score > b.score) return one;
    if (b.score > a.score) return -one;
    return 0;
  }).reverse();
}

export default function checkDuplicatesInStorage(userRanking) {
  const { name, score } = userRanking;
  const oldStorage = getStorage('ranking');
  if (oldStorage) {
    const oldRanking = oldStorage.filter(({
      name: oldN, score: oldS,
    }) => oldN !== name || score < oldS);
    return oldRanking.find(({ name: oldN }) => oldN === name)
      ? ([...sortRanking(oldRanking)])
      : ([...sortRanking([userRanking, ...oldRanking])]);
  }
  return ([userRanking]);
}
