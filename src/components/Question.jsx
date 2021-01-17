import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  render() {
    const {
      currentQuestion,
      onClickNext,
      onClickQuestion,
      answered,
    } = this.props;

    const allAnswers = [
      ...currentQuestion.incorrect_answers, currentQuestion.correct_answer,
    ];

    return (
      <div>
        <div>
          <h2 data-testid="question-category">{currentQuestion.category}</h2>
          <p data-testid="question-text">{currentQuestion.question}</p>
        </div>
        <div>
          {
            allAnswers.map((answer, index) => (
              <button
                className={ answered ? 'answered' : '' }
                key={ answer }
                type="button"
                data-testid={
                  answer === currentQuestion.correct_answer
                    ? 'correct-answer'
                    : `wrong-answer-${index}`
                }
                onClick={ onClickQuestion }
              >
                {answer}
              </button>
            ))
          }
          {
            answered && (
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
  answered: PropTypes.bool.isRequired,
};

export default Question;
