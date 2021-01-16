import * as callAPI from '../services/callAPI';

export function login(object) {
  return ({
    type: 'LOGIN',
    player: object,
  });
}

export function rightAnswer(number) {
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

export function countDown() {
  return (dispatch, getState) => {
    const second = 1000;
    const clock = setInterval(() => {
      const store = getState();
      const { questions, timer } = store;
      const { click } = questions;
      const { time } = timer;
      if (time === 0 || click !== '') return clearInterval(clock);
      dispatch(lessTime());
    }, second);
    return clock;
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

export function totalTime() {
  return (dispatch, getState) => {
    const questionTime = 30000;
    const second = 1000;
    const questionTimer = setTimeout(() => {
      const store = getState();
      const { questions } = store;
      const { click } = questions;
      if (click === '') return dispatch(timeOut());
    }, questionTime);
    setInterval(() => {
      const store = getState();
      const { questions } = store;
      const { click } = questions;
      if (click !== '') return clearTimeout(questionTimer);
    }, second);
    return questionTimer;
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
