export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const LIST_QUESTIONS = 'LIST_QUESTIONS';

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const failedRequest = (error) => ({
  type: REQUEST_FAILED,
  error,
});

export const listQuestions = (questions) => ({
  type: LIST_QUESTIONS,
  payload: questions,
});
