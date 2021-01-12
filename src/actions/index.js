export function user(email) {
  return ({
    type: "USER",
    payload: email,
  });
}
