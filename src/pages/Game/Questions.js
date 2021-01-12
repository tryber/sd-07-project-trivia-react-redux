import React, { Component } from 'react';
import * as triviaAPI from '../../services/triviaAPI';

class Questions extends Component {
  constructor() {
    super();
    this.fetchTriviaAPI = this.fetchTriviaAPI.bind(this);

    this.state = {
      questions: [],
      currentQuestion: 0,
      isLoading: true,
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
    const { isLoading } = this.state;
    if (isLoading) return '';

    const { currentQuestion, questions } = this.state;
    console.log(questions[currentQuestion]);

    return (
      <div>
        <div data-testid="question-category">
          { questions[currentQuestion].category }
        </div>
        <div data-testid="question-text">
          { questions[currentQuestion].question }
        </div>
        <div>
          Resposta
        </div>
      </div>
    );
  }
}

export default Questions;
