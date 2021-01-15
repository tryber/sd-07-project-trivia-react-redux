import * as callAPI from '../services/callAPI';

export function login(object) {
  return ({
    type: 'LOGIN',
    player: object,
  });
}

export function timer() {
  return ({
    type: 'TIME_OUT',
  });
}

export function changeColor() {
  return ({
    type: 'CLICK',
  });
}

export function nextQuestion(array) {
  return ({
    type: 'NEXT_QUESTION',
    newQuestions: array,
  });
}

export function redirect(string) {
  if (string === 'feedback') {
    return ({
      type: 'REDIRECT_FEEDBACK',
    });
  }
}

export function getQuestions(token) {
  return async (dispatch) => {
    const requestQuestions = await callAPI.requestQuestions(token);
    const questions = requestQuestions.results;
    return dispatch(nextQuestion(questions));
  };
}
