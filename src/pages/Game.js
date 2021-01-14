import React, { Component } from 'react';
import questionsRequest from '../services/QuestionsRequest';
import Header from '../components/Header';
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
    console.log(questionsArray);
    return (
      <div>
        <Header />
        <h1>Token da requisição</h1>
        {localStorage.token}
        {questionsArray[currentQuestion]
          && <Questions question={ questionsArray[currentQuestion] } />}
        <button
          data-testid="btn-next"
          type="button"
        >
          Próxima
        </button>
      </div>
    );
  }
}

export default Game;
