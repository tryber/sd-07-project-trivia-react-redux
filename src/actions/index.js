const USER_EMAIL = 'USER_EMAIL';
const START_REQUEST = 'START_REQUEST';
const RECEIVED_QUESTIONS = 'RECEIVED_QUESTIONS';
const FAILED_REQUEST = 'FAILED_REQUEST';

export default { USER_EMAIL, START_REQUEST, RECEIVED_QUESTIONS, FAILED_REQUEST };

export const getEmail = (email) => ({
  type: USER_EMAIL,
  email,
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
    dispatch(startRequest);
    try {
      const { token } = JSON.parse(localStorage.getItem('token')).token;
      const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      dispatch(receivedQuestions(data));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}
