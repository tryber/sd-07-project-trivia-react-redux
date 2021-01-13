const INITIAL_STATE = {
  user: {
    player: {
      name: '',
      assertions: '',
      score: '',
      gravatarEmail: '',
    },
  },
  ranking: [],
  triviaToken: {
    token: '',
    isLoading: false,
  },
};

export default INITIAL_STATE;
