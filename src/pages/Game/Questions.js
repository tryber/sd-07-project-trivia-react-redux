import React, { Component } from 'react';
import * as triviaAPI from '../../services/triviaAPI';

class Questions extends Component {
  constructor() {
    super();
    this.fetchTriviaAPI = this.fetchTriviaAPI.bind(this);

    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.fetchTriviaAPI();
  }

  async fetchTriviaAPI() {
    const quantityOfQuestions = 5;
    const token = localStorage.getItem('token');
    const requestQuestions = await triviaAPI.getQuestions(quantityOfQuestions, token);
    this.setState({
      questions: requestQuestions.results,
    });
  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <div>
        <div data-testid="question-category">
          Categoria
        </div>
        <div data-testid="question-text">
          Pergunta
        </div>
        <div>
          Resposta
        </div>
      </div>
    );
  }
}

export default Questions;
