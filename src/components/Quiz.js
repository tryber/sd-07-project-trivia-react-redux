import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Quiz.css';

class Quiz extends Component {
  // constructor() {
  //  super();
  //  this.state = {
  //    answered: false,
  //  };
  // }

  // handleClick() {
  // const { answered } = this.state;
  //  this.setState({
  //    answered: true,
  //  });
  // }

  render() {
    // const { answered } = this.state;
    const { results, nextQuestion } = this.props;
    const { correct_answer: correctAnswer } = results;
    const { incorrect_answers: incorrectAnswers } = results;
    const { question, category, difficulty } = results;
    return (
      <div>
        <p data-testid="question-text">{ question }</p>
        <p>{ difficulty }</p>
        <p data-testid="question-category">{ category }</p>

        <button className="answer-correct" data-testid="correct-answer" type="button">
          { correctAnswer }
        </button>

        <button
          className="answer-wrong"
          data-testid="wrong-answer-0"
          type="button"
        >
          { incorrectAnswers[0] }
        </button>

        <button className="answer-wrong" data-testid="wrong-answer-1" type="button">
          { incorrectAnswers[1] }
        </button>

        <button className="answer-wrong" data-testid="wrong-answer-2" type="button">
          { incorrectAnswers[2] }
        </button>

        <button type="button" onClick={ nextQuestion }>
          Próxima
        </button>
      </div>
    );
  }
}

export default Quiz;

Quiz.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  nextQuestion: PropTypes.func.isRequired,
};
