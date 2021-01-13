export const REQUEST_QUESTION = 'REQUEST_QUESTION';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';

function requestApi() {
  return { type: REQUEST_QUESTION, loading: true };
}

function requestSuccess(payload) {
  return { type: REQUEST_SUCCESS, loading: false, payload };
}

export function fetchThunk() {
  return async (dispatch) => {
    dispatch(requestApi());
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const questions = await response.json();
      dispatch(requestSuccess(questions));
    } catch (error) {
      console.log(error);
    }
  };
}
