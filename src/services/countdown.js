export default function countdown(callback) {
  const oneSecond = 1000;
  return setInterval(() => {
    callback(clearInterval);
  }, oneSecond);
}
