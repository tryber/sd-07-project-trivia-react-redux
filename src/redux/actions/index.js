import { requestQuestions } from '../../services/api';

export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const NEXT_QUESTION = 'NEXT_QUESTION';

export const login = (name, email) => (
  {
    type: LOGIN_EMAIL,
    user: {
      name,
      email,
    },
  }
);

// export const nextQuestion = () => (
//   {
//     type: NEXT_QUESTION,

//   }
// );

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
