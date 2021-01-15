function rankingLocalStorage() {
  if (localStorage.getItem('ranking') === null) {
    localStorage.setItem('ranking', '[]');
  }
  return JSON.parse(localStorage.getItem('ranking'));
}

export default rankingLocalStorage;
