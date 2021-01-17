export default function ScoreCalc(time, dificulties) {
  let dificulty;
  switch (dificulties) {
    case 'easy':
      dificulty = 1;
      break;
    case 'medium':
      dificulty = 2;
      break;
    case 'hard':
      dificulty = 3;
      break;
    default:
      dificulty = 1;
      break;
  }

  const player = JSON.parse(localStorage.getItem('state'));
  const ten = 10;
  const score = ten + (time * dificulty);
  player.player.score += score;
  player.player.assertions += 1;
  localStorage.setItem('state', JSON.stringify(player));
  return player.player;
}
