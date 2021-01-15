export const getStorage = (key) => {
  if (localStorage.getItem(key)) {
    return (JSON.parse(localStorage.getItem(key)));
  }
  return '';
};

export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
