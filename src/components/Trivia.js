import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Trivia extends Component {
  render() {
    const { renderAlternatives, questions, numberQuestion } = this.props;
    const { results } = questions;
    if (results) {
      const {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = results[numberQuestion];
      return (
        <div>
          <p data-testid="question-category">{results[numberQuestion].category}</p>
          <p data-testid="question-text">{results[numberQuestion].question}</p>
          <div>
            { renderAlternatives(correctAnswer, incorrectAnswers) }
          </div>
        </div>
      );
    }
    return (
      <div>Loading...</div>
    );
  }
}

Trivia.propTypes = {
  renderAlternatives: PropTypes.func.isRequired,
  numberQuestion: PropTypes.number.isRequired,
  questions: PropTypes.shape({
    results: PropTypes.shape({
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
      category: PropTypes.string,
      question: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Trivia;
