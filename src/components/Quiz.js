import React from 'react';
import PropTypes from 'prop-types';

class Quiz extends React.Component {
  render() {
    const {
      category,
      question,
      correctAnswer,
      incorrectAnswers,
    } = this.props;

    const i = 0;

    return (
      <div>
        <h3 data-testid="question-category" key={ `category${i}` }>{category}</h3>
        <p data-testid="question-text" key={ `question${i}` }>{question}</p>
        {incorrectAnswers.map((incorrectAnswer, index) => (
          <button
            type="button"
            key={ incorrectAnswer }
            data-testid={ `wrong-answer-${index }`}>
            { incorrectAnswer }
          </button>
        ))}
        <button
          type="button"
          data-testid="correct-answer"
          key={ correctAnswer }
        >
          { correctAnswer }
        </button>
      </div>
    );
  }
}

Quiz.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Quiz;
