const getScore = (difficulty, time, testid) => {
  const one = 1;
  const two = 2;
  const three = 3;
  const ten = 10;
  let score = 0;
  const number = 14;
  let level;

  const answer = testid.substring(0, number);

  if (difficulty === 'hard') level = three;

  if (difficulty === 'medium') level = two;

  if (difficulty === 'easy') level = one;

  if (!answer.includes('wrong-answer')) {
    score = (ten + (time * level));
  }

  return score;
};

export default getScore;
