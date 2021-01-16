import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  render() {
    const {
      currentQuestion: {
        category, question, correct_answer, incorrect_answers,
      },
      onClickNext,
      onClickQuestion,
      nextButtonVisible,
    } = this.props;

    const allAnswers = [...incorrect_answers, correct_answer];

    return (
      <div>
        <div>
          <h2 data-testid="question-category">{category}</h2>
          <p data-testid="question-text">{question}</p>
        </div>
        <div>
          {
            allAnswers.map((answer, index) => (
              <button
                key={ answer }
                type="button"
                data-testid={
                  answer === correct_answer ? 'correct-answer' : `wrong-answer-${index}`
                }
                onClick={ onClickQuestion }
              >
                {answer}
              </button>
            ))
          }
          {
            nextButtonVisible && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ onClickNext }
              >
                Próxima pergunta!
              </button>
            )
          }
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  currentQuestion: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClickNext: PropTypes.func.isRequired,
  onClickQuestion: PropTypes.func.isRequired,
  nextButtonVisible: PropTypes.bool.isRequired,
};

export default Question;
