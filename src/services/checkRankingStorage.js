import { getStorage } from '.';

function comparation(score, scoreB) {
  if (score < scoreB) {
    const oneN = -1;
    return oneN;
  }
  if (score < scoreB) {
    const one = 1;
    return one;
  }
  const zero = 0;
  return zero;
}

function sortRanking(old) {
  return old.sort((
    { score }, { scoreB },
  ) => comparation(score, scoreB));
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
