import React, { Component } from 'react';
import { fetchQuestionNAnswer } from '../../services';
import './Questions.css';

class Questions extends Component {
  constructor() {
    super();

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      questions: [],
      isLoading: true,
      questionNumber: 0,
      isDisabled: false,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const token = localStorage.getItem('token');
    const result = await fetchQuestionNAnswer(token);
    this.setState({ questions: result, isLoading: false });
  }

  handleClick() {
    this.setState({ isDisabled: true });
  }

  render() {
    const { questions, isLoading, questionNumber, isDisabled } = this.state;
    const questionToLoad = questions[questionNumber];
    if (isLoading) return <h1>Is Loading</h1>;
    return (
      <div>
        <h2 data-testid="question-category">{ questionToLoad.category }</h2>
        <h2 data-testid="question-text">{ questionToLoad.question }</h2>
        <button
          data-testid="correct-answer"
          type="button"
          className="correct-answer"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          { questionToLoad.correct_answer }
        </button>
        { questionToLoad.incorrect_answers
          .map((answer, index) => (
            <button
              data-testid={ `wrong-answer-${index}` }
              type="button"
              className="wrong-answer"
              disabled={ isDisabled }
              onClick={ this.handleClick }
              key={ index }
            >
              { answer }
            </button>)) }
      </div>
    );
  }
}

export default Questions;
