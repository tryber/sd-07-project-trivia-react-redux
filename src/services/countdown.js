export default function countdown(callback) {
  const oneSecond = 1000;
  setInterval(() => {
    callback(clearInterval);
  }, oneSecond);
}
