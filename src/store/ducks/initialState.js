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
  triviaSetting: {
    categories: [],
    isLoading: false,
    filter: {
      category: '',
      difficulty: '',
      type: '',
    },
  },
};

export default INITIAL_STATE;
