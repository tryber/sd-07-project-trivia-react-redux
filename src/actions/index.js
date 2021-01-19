let tokenUsed = '';

export const getGravatar = (hash) => ({
  type: 'fetchSucessGravatar',
  hashData: hash,
});

export const getToken = (token) => ({
  type: 'fetchSucessToken',
  tokenData: token,
});

export const getQuestions = (questions) => ({
  type: 'fetchSucessQuestion',
  questions,
});

export const fetchToken = () => async (dispatch) => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const tokenResponse = await request.json();
  tokenUsed = tokenResponse.token;
  // console.log(tokenResponse.token);
  dispatch(getToken(tokenUsed));
};

export const fetchQuestions = () => async (dispatch) => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenUsed}`);
  const questionResponse = await request.json();
  dispatch(getQuestions(questionResponse.results));
};

export const fetchGravatar = (value) => async (dispatch) => {
  // console.log(value) // chegando value de hash ok //d8c145dca4f9fca77a49ec32b58e688b55c01b721a2d9cf5d2478662e3fe5e5d
  const requestGravatar = await fetch(`https://www.gravatar.com/avatar/${value}`);
  console.log(requestGravatar); // retorna objeto com varias keys incluindo chave url
  // const gravatarResponse = await request.json();
  // console.log(gravatarResponse);
  dispatch(getGravatar(requestGravatar.url));
};

export const getPlayer = (player) => ({
  type: 'savePlayer',
  payload: player,
});

export const saveName = (name) => async (dispatch) => {
  dispatch(getPlayer(name));
};

export const saveTimer = (payload, onLoad) => ({
  type: 'saveTime',
  payload,
  onLoad,
});
