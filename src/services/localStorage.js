/*
  REFERENCE:
    https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
*/

const STATE_ITEM_KEY = 'state';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STATE_ITEM_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return { user: JSON.parse(serializedState) };
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_ITEM_KEY, serializedState);
  } catch (error) {
    // IGNORE WRITE ERRORS
  }
};
