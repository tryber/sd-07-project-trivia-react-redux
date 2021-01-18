const ADD_EMAIL = 'ADD_EMAIL';
const ADD_NAME = 'ADD_NAME';
const ADD_GAMEDATES = 'ADD_GAMEDATES';
const RELOAD_GAME = 'RELOAD_GAME';

export const addEmail = (email) => ({ type: ADD_EMAIL, email });
export const addName = (name) => ({ type: ADD_NAME, name });
export const addGameDates = (payload) => ({ type: ADD_GAMEDATES, payload });
export const reloadGame = () => ({ type: RELOAD_GAME });

export { ADD_EMAIL, ADD_NAME, ADD_GAMEDATES, RELOAD_GAME };

export function updateGameDates(payload, callback) {
  return async (dispatch) => {
    await dispatch(addGameDates(payload));
    callback();
  };
}
