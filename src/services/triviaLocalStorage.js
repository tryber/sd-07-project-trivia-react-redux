const localStorageTrivia = localStorage.getItem('token');

async function fetchTrivia() {
  const endpoint = await fetch(`https://opentdb.com/api.php?amount=5&token=${localStorageTrivia}`);
  const data = await endpoint.json();
  return data.results;
}

// const trivia = fetchTrivia();

export default fetchTrivia;
