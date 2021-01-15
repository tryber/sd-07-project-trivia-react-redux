import { tokenGetter } from '../../helper/trivia_request';
import gravatarImgUrlGetter from '../../helper/gravatar_request';

export const SET_USER_DATA = 'SET_USER_DATA';

const UserDataSetter = (data) => ({
  type: SET_USER_DATA,
  data,
});

export const clickJogar = (name, email) => async (dispatch) => {
  const token = await tokenGetter();
  localStorage.setItem('token', token);
  const imgUrl = gravatarImgUrlGetter(email);
  dispatch(UserDataSetter({ token, name, email, imgUrl }));
};
