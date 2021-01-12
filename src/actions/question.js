export function thunkApiQuestions(questions, token) {
  return async (dispatch) => {
    try {
      dispatch();
      const quest = await fetch(`https://opentdb.com/api.php?amount=${questions}&token=${token}`);
      const result = await quest.json();
      dispatch(getQuestion(result));
    } catch (error) {
      dispatch();
    }
  };
}

export const getQuestion = (payload) => ({
  type: 'GET_QUESTIONS',
  payload,
});

