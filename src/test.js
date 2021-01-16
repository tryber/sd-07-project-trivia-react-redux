/* const interval = 30000; // 30 segundos
const expectedTime = Date.now() - interval;

const start = Date.now();

setInterval(() => {
  const delta = Date.now() + interval; // milliseconds elapsed since start
  const end = Date.now();
  console.log('delta', delta);

  console.log('output', (Math.floor(delta / 1000) - end)); // in seconds
  // alternatively just show wall clock time:
  console.log('newDate', new Date().toUTCString());
}, expectedTime); */

/* const countDownSeconds = new Date().getTime() + 30000;
const x = setInterval(() => {
  const now = new Date().getTime();
  const distance = countDownSeconds - now;
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById('demo').innerHTML = seconds;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById('demo').innerHTML = 'EXPIRED';
  }
}, 1000); */

const x = ['a', 'b', 'c', 'd'];

const randomVar = () => 0.5 - Math.random();
console.log(x.sort(() => (0.5 - Math.random())));
