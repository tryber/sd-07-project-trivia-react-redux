import md5 from 'crypto-js/md5';

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

const requestAction = () => ({
  type: REQUEST,
});

const successAction = (gravatar) => ({
  type: SUCCESS,
  gravatar,
});

const errorAction = (error) => ({
  type: ERROR,
  error,
});

export function fetchGravatar(userEmail) {
  return async (dispatch) => {
    try {
      dispatch(requestAction());
      const userHash = await md5(userEmail);
      const gravatarURL = (`https://www.gravatar.com/avatar/${userHash}`);
      dispatch(successAction(gravatarURL));
    } catch (error) {
      return dispatch(errorAction());
    }
  };
}
