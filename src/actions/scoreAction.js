export const PLAYERDADOS = 'PLAYERDADOS';
export const GIVE_ANSWER = 'GIVE_ANSWER';
export const GIVE_SCORE = 'GIVE_SCORE';
export const NEXT_QUESTION = 'NEXT_QUESTION';

export const dadosJogador = (name, email) => ({
  type: PLAYERDADOS,
  name,
  email,
});
export const answerQuestions = () => ({
  type: GIVE_ANSWER,
});
export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});
export const giveScore = (value) => ({
  type: GIVE_SCORE,
  value,
});
