import { requestQuestions } from '../../services/api';

export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const RESET_TIMER = 'RESET_TIMER';
export const COUNT_DOWN = 'COUNT_DOWN';
export const FREEZE_TIME = 'FREEZE_TIME';
export const START_TIME = 'START_TIME';

export const login = (name, email) => (
  {
    type: LOGIN_EMAIL,
    user: {
      name,
      email,
    },
  }
);

export const nextQuestion = () => (
  {
    type: NEXT_QUESTION,
    number: 1,
  }
);

const questionsTimeTrivia = (questions, time) => (
  {
    type: SAVE_QUESTIONS,
    questions,
    time,
  }
);

export function fetchQuestions() {
  return async (dispatch) => {
    const request = await requestQuestions();
    dispatch(questionsTimeTrivia(request.results, request.response_code));
  };
}

export function startTimeAction(setIntervalState) {
  return {
    type: START_TIME,
    setIntervalState,
  };
}

export function resetTimer() {
  return {
    type: RESET_TIMER,
  };
}

export function CountDownAction() {
  return {
    type: COUNT_DOWN,
  };
}

export function freezeTimeAction() {
  return {
    type: FREEZE_TIME,
  };
}
