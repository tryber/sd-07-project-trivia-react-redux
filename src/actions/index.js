const USER_EMAIL = 'USER_EMAIL';
const START_REQUEST = 'START_REQUEST';
const RECEIVED_QUESTIONS = 'RECEIVED_QUESTIONS';
const FAILED_REQUEST = 'FAILED_REQUEST';
const USER_NAME = 'USER_NAME';
const GET_SCORE = 'GET_SCORE';
const UPDATE_CORRECT_COUNT = 'UPDATE_CORRECT_COUNT';
const GET_PICTURE = 'GET_PICTURE';

export default {
  USER_EMAIL,
  START_REQUEST,
  RECEIVED_QUESTIONS,
  FAILED_REQUEST,
  USER_NAME,
  GET_SCORE,
  UPDATE_CORRECT_COUNT,
  GET_PICTURE,
};

export const getEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const getName = (name) => ({
  type: USER_NAME,
  name,
});

const startRequest = () => ({
  type: START_REQUEST,
});

const receivedQuestions = (payload) => ({
  type: RECEIVED_QUESTIONS,
  payload,
});

const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  error,
});

export function fetchQuestions() {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      dispatch(receivedQuestions(data));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

export const getScore = (score) => ({
  type: GET_SCORE,
  score,
});

export const updateCorrectCount = () => ({
  type: UPDATE_CORRECT_COUNT,
});

export const getPicture = (picture) => ({
  type: GET_PICTURE,
  picture,
});
