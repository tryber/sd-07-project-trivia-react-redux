export const initialize = () => {
  if (!localStorage.getItem('ranking')) {
    console.log('criei');
    localStorage.setItem('ranking', JSON.stringify([]));
  }
};

export const readRanking = () => JSON.parse(localStorage.getItem('ranking'));

export const saveRanking = (newPlayerRanking) => {
  const ranking = readRanking();
  const newRaking = [...ranking, newPlayerRanking];
  const sortedRanking = newRaking.sort((a, b) => b.score - a.score);
  localStorage.setItem('ranking', JSON.stringify(sortedRanking));
};
