import * as callAPI from '../services/callAPI';

export function login(object) {
  return ({
    type: 'LOGIN',
    player: object,
  });
}

export function correctAnswer(number) {
  return ({
    type: 'CORRECT_ANSWER',
    points: number,
  });
}

function lessTime() {
  return ({
    type: 'TIME_RUNNING',
  });
}

export function resetTimer() {
  return ({
    type: 'RESET',
  });
}

export function time() {
  return (dispatch, getState) => {
    const second = 1000;
    const timer = setInterval(() => {
      const time = getState().timer.time;
      const click = getState().questions.click;
      if (time === 0 || click !== '') return clearInterval(timer);
      dispatch(lessTime());
    }, second);
    return timer
  };
}

export function enableQuestions() {
  return ({
    type: 'ENABLE',
  });
}

export function timeOut() {
  return ({
    type: 'TIME_OUT',
  });
}

export function timer() {
  return (dispatch, getState) => {
    const time = 30000;
    const second = 1000;
    const timer = setTimeout(() => {
      const click = getState().questions.click;
      if (click === '') return dispatch(timeOut());
    }, time);
    setInterval(() => {
      const click = getState().questions.click;
      if (click !== '') return clearTimeout(timer);
    }, second);
    return timer
  };
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
  if (string === 'toFeedback') {
    return ({
      type: 'REDIRECT_FEEDBACK',
    });
  }
  if (string === 'inFeedback') {
    return ({
      type: 'IN_FEEDBACK',
    });
  }
}

export function changeSettings({ name, value }) {
  if (name === 'category') {
    return ({
      type: 'CHANGE_CATEGORY',
      newCategory: value,
    });
  }
  if (name === 'difficulty') {
    return ({
      type: 'CHANGE_DIFFICULTY',
      newDifficulty: value,
    });
  }
  if (name === 'type') {
    return ({
      type: 'CHANGE_TYPE',
      newType: value,
    });
  }
}

export function getQuestions(object) {
  return async (dispatch) => {
    const requestQuestions = await callAPI.requestQuestions(object);
    const questions = requestQuestions.results;
    return dispatch(nextQuestion(questions));
  };
}
