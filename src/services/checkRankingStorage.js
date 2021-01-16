import { getStorage } from '.';

function sortRanking(old) {
  return old.sort((a, b) => (a.score > b.score)
    ? 1
    : ((b.score > a.score) ? -1 : 0) ).reverse();
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
  