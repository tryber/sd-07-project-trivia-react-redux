export default function getScore(difficulty, timer) {
  const difficultyParameter = { hard: 3, medium: 2, easy: 1 };
  const ten = 10;
  const points = ten + (+timer * difficultyParameter[difficulty]);
  return points;
}
