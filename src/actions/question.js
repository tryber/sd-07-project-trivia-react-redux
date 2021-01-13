export const getQuestion = (payload) => ({
  type: 'GET_QUESTIONS',
  payload,
});

export const requestQuestion = () => ({
  type: 'REQUEST_QUESTIONS',
});

export function thunkApiQuestions(questions, token) {
  return async (dispatch) => {
    const resolve = await fetch(`https://opentdb.com/api.php?amount=${questions}&token=${token}`);
    const json = await resolve.json();
    return dispatch(getQuestion(json));
  };
}
