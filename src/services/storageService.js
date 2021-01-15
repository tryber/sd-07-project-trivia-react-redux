localStorage.setItem('raking', JSON.stringify([]));

export const readRanking = () => JSON.parse(localStorage.getItem('raking'));

const saveRanking = (ranking) => localStorage.setItem('raking', JSON.stringify(ranking));

export const pushToRaking = (imgValue, nameValue, scoreValue) => {
  console.log(
    `estou recebendo s variaveis ${imgValue} ${nameValue} ${scoreValue}`,
  );
  const rankingBefore = readRanking();
  console.log(`o rankingBefore é ${rankingBefore}`);
  const newPlayer = { img: imgValue, name: nameValue, score: scoreValue };
  const rankingAfter = rankingBefore
    .concat(newPlayer)
    .sort((a, b) => b.score - a.score);
  saveRanking(rankingAfter);
};
