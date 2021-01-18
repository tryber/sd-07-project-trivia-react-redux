export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_SUCCESS = 'REQUEST_QUESTIONS_SUCCESS';
export const REQUEST_QUESTIONS_FAIL = 'REQUEST_QUESTIONS_FAIL';

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const requestQuestionsSuccess = (questions) => ({
  type: REQUEST_QUESTIONS_SUCCESS,
  questions,
});

const requestQuestionFail = (error) => ({
  type: REQUEST_QUESTIONS_FAIL,
  error,
});

const numberOfQuestions = 5;

// &token=${ token }

const TRIVIA_QUESTIONS_API = `https://opentdb.com/api.php?amount=${numberOfQuestions}`;

export function fetchQuestionsTrivia() {
  return async (dispatch) => {
    dispatch(requestQuestions());
    const token = JSON.parse(localStorage.getItem('token'));
    return fetch(`${TRIVIA_QUESTIONS_API}&token=${token}`)
      .then((data) => data.json())
      .then((data) => dispatch(requestQuestionsSuccess(data)))
      .catch((error) => dispatch(requestQuestionFail(error)));
  };
}
