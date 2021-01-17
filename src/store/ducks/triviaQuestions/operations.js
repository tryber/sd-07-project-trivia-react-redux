import actions from './actions';
import { fetchTriviaToken } from '../triviaToken';

const ENDPOINT_GET_QUESTIONS = 'https://opentdb.com/api.php?amount=5&token=';

const mapRandomAnswers = (results) => {
  const returnResults = [];
  results.forEach((question) => {
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = question;
    const randomAnswers = [];
    randomAnswers.push({
      text: correctAnswer,
      correct: true,
      dataTestid: 'correct-answer',
      randomIndex: Math.random(),
    });
    incorrectAnswers.forEach((answer, index) => randomAnswers.push({
      text: answer,
      correct: false,
      dataTestid: `wrong-answer-${index}`,
      randomIndex: Math.random(),
    }));

    randomAnswers.sort((a, b) => a.randomIndex - b.randomIndex);

    returnResults.push({ ...question, randomAnswers: [...randomAnswers] });
  });

  return returnResults;
};

export default function fetchTriviaQuestions(filter) {
  return async (dispatch, getState) => {
    dispatch(actions.request());
    try {
      let setting = '';
      Object.keys(filter).forEach((key) => {
        setting += filter[key] ? `&${key}=${filter[key]}` : '';
      });
      let { token } = getState().triviaToken;
      let response = await fetch(`${ENDPOINT_GET_QUESTIONS}${token}${setting}`);
      let result = await response.json();
      if (result.response_code !== 0) {
        await dispatch(fetchTriviaToken());
        token = getState().triviaToken.token;
        response = await fetch(`${ENDPOINT_GET_QUESTIONS}${token}${setting}`);
        result = await response.json();
      }
      dispatch(actions.receiveSuccess(mapRandomAnswers(result.results)));
    } catch (error) {
      dispatch(actions.receiveFail(error));
    }
  };
}
