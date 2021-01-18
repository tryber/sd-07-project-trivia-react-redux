const GET_QUESTIONS = 'GET_QUESTIONS';
const SET_TIME = 'SET_TIME';

export const getQuestion = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const setTime = (time) => ({
  type: SET_TIME,
  time,
});

export function thunkApiQuestions(token) {
  return async (dispatch) => {
    const resolve = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const json = await resolve.json();
    return dispatch(getQuestion(json));
  };
}
