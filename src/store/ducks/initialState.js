const INITIAL_STATE = {
  user: {
    player: {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
      picture: '',
    },
    isLoading: false,
    gravatarProfile: {},
  },
  ranking: {
    ranking: [],
    nextIndex: 0,
  },
  triviaToken: {
    token: '',
    isLoading: false,
  },
  triviaQuestions: {
    questions: [],
    isLoading: false,
  },
};

export default INITIAL_STATE;
