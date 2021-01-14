export function login(object) {
  return ({
    type: 'LOGIN',
    player: object,
  });
}

export function saveQuestions(array) {
  return ({
    type: 'SAVE_QUESTIONS',
    questions: array,
  });
}
