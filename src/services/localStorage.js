export const getStorage = (key) => JSON.parse(localStorage.getItem(key));
export const setStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};
