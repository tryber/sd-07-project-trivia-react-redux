export function login(object) {
  return ({
    type: 'LOGIN',
    player: object,
  });
}

export function timer() {
  return ({
    type: 'TIME_OUT',
  });
}

export function changeColor() {
  return ({
    type: 'CLICK',
  });
}

export function nextQuestion() {
  return ({
    type: 'NEXT_QUESTION',
  });
}
