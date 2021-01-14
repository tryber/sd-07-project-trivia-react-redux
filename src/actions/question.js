export const getQuestion = (payload) => ({
  type: 'GET_QUESTIONS',
  payload,
});

export function thunkApiQuestions(token) {
  return async (dispatch) => {
    const resolve = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const json = await resolve.json();
    console.log(json.results);
    return dispatch(getQuestion(json.results));
  };
}
