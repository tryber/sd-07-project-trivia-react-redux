import questionsAPI from '../services/questionAPI';

export const LOGIN = 'LOGIN';
export const QUESTION = 'QUESTION';
export const SCORE = 'SCORE';
export const ASSERTIONS = 'ASSERTIONS';

export const loginAction = (email, username) => ({
  type: LOGIN,
  email,
  username,
});

export const questionsAction = (questions) => ({
  type: QUESTION,
  questions,
});

export const scoreAction = (score) => ({
  type: SCORE,
  score,
});

export const assertionsAction = (assertions) => ({
  type: ASSERTIONS,
  assertions,
});

export const questionsThunk = () => async (dispatch) => {
  const createToken = localStorage.getItem('token');
  const questionsReturn = await questionsAPI(createToken);
  dispatch(questionsAction(questionsReturn));
};

export function addScoreboard(score, assertions) {
  return (dispatch, getState) => {
    const { name, email } = getState().login;
    dispatch(scoreAction(score));
    dispatch(assertionsAction(assertions));
    const StoragedPlayer = { player:
    { name, gravatarEmail: email, score, assertions },
    };
    localStorage.setItem('state', JSON.stringify(StoragedPlayer));
  };
}
