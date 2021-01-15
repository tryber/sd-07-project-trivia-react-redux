import { getToken, getQuestions } from '../helpers';

export const TOKEN = 'TOKEN';
export const QUESTIONS = 'QUESTIONS';

const play = (payload) => ({
  type: TOKEN,
  payload,
});

const question = (payload) => ({
  type: QUESTIONS,
  payload,
});

export function fetchTokenAction() {
  return (dispatch) => {
    getToken()
      .then(
        (token) => dispatch(play(token)),
      )
      .then(
        (action) => {
          const { token } = action.payload;
          getQuestions(token)
            .then(
              ((response) => dispatch(question(response))
              ),
            );
        },
      );
  };
}
