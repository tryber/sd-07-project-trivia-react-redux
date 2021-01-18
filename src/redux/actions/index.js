// import { requestQuestions } from '../../services/api';

export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const RESET_TIMER = 'RESET_TIMER';
export const COUNT_DOWN = 'COUNT_DOWN';
export const FREEZE_TIME = 'FREEZE_TIME';
export const START_TIME = 'START_TIME';
export const FETICHING_QUESTIONS = 'FETICHING_QUESTIONS';
export const CORRECLY_ANSWER_SUM = 'CORRECLY_ANSWER_SUM';

export const login = (name, email) => ({
  type: LOGIN_EMAIL,
  user: {
    name,
    email,
  },
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
  number: 1,
});

export const fetchingQuestions = () => ({
  type: FETICHING_QUESTIONS,
});

const questionsTimeTrivia = (questions, time) => ({
  type: SAVE_QUESTIONS,
  questions,
  time,
});

export function fetchQuestions() {
  return (dispatch) => {
    dispatch(fetchingQuestions());
    const token = JSON.parse(localStorage.getItem('token'));
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`).then(
      (response) => response.json().then(
        (request) => dispatch(
          questionsTimeTrivia(request.results, request.response_code),
        ),
      ),
    );
  };
}

export function correclyAnswerSum(tenPointForCorrectAnswer, timer, difficulty) {
  return {
    type: CORRECLY_ANSWER_SUM,
    score: tenPointForCorrectAnswer + (timer * difficulty),
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
