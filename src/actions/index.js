export function login(object) {
  return ({
    type: 'LOGIN',
    player: object,
  });
}

export function test() {
  return ({
    type: 'TEST',
    player: 'test',
  });
}
