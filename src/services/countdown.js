export function countdown(callback) {
  const oneSecond = 1000;
  return setInterval(() => {
    callback(clearInterval);
  }, oneSecond);
}
export function stopTimer(name) {
  return clearInterval(name);
}
