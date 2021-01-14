import React, { Component } from 'react';
import questionsRequest from '../services/QuestionsRequest';

import Questions from './Questions';

class Game extends Component {
  constructor() {
    super();
    this.fetchQuestions = this.fetchQuestions.bind(this);

    this.state = {
      questionsArray: [],
      currentQuestion: 0,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const token = localStorage.getItem('token');
    const myQuestions = await questionsRequest(token);
    this.setState({
      questionsArray: myQuestions,
    });
  }

  render() {
    const { questionsArray, currentQuestion } = this.state;
    return (
      <div>
        <header>
          <h1>Player Info</h1>
          <img
            data-testid="header-profile-picture"
            src={ localStorage.email }
            alt={ localStorage.username }
          />
          <h2 data-testid="header-player-name">{localStorage.username}</h2>
          <h2>
            Placar:
            <span data-testid="header-score">0</span>
          </h2>
        </header>
        <h1>Token da requisição</h1>
        {localStorage.token}
        <Questions question={ questionsArray[currentQuestion] } />
      </div>
    );
  }
}

export default Game;
