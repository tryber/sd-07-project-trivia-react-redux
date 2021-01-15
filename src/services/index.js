export const setStorage = (key, value) => localStorage.setItem(
  key, JSON.stringify(value),
);

export const getStorage = (key) => JSON.parse(localStorage.getItem(key));
