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

export function changeScore(payload) {
  return ({
    type: 'CHANGE_SCORE',
    payload,
  })
}
