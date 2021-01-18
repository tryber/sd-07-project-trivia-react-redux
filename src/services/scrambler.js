export default function scrambler(array) {
  const newArray = [...array];
  newArray.forEach(() => {
    const randomIndex = Math.floor(Math.random() * newArray.length);
    const randomElement = newArray[randomIndex];
    const firstElement = newArray[0];
    newArray[randomIndex] = firstElement;
    newArray[0] = randomElement;
  });
  return newArray;
}
