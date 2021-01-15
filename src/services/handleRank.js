export function setRank(newPerson) {
  console.log('ENTROU');
  let rank = JSON.parse(localStorage.getItem('rank'));
  if (rank === null) {
    rank = [];
  }
  rank.push(newPerson);
  rank = rank.sort((a, b) => {
    console.log('.');
    console.log(a.name);
    console.log(b.name);
    return b.Score - a.Score;
  });
  localStorage.setItem('rank', JSON.stringify(rank));
}
export function getRank() {
  return JSON.parse(localStorage.getItem('rank'));
}
