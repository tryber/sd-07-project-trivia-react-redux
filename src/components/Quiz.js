import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class Quiz extends React.Component {
  constructor() {
    super();
    this.showAnswer = this.showAnswer.bind(this);
  }

  showAnswer() {
    const rightAnswer = document.querySelector('#rightAnswer');
    const incorrectAnswers = document.querySelectorAll('#wrongAnswer');
    rightAnswer.className = 'correct-answer';
    incorrectAnswers.forEach((incorrectAnswer) => {
      incorrectAnswer.className = 'incorrect-answer';
    });
  }

  render() {
    const {
      category,
      question,
      correctAnswer,
      incorrectAnswers,
    } = this.props;

    const i = 0;
    const { showAnswer } = this;

    return (
      <div>
        <h3 data-testid="question-category" key={ `category${i}` }>{ category }</h3>
        <p data-testid="question-text" key={ `question${i}` }>{ question }</p>
        {incorrectAnswers.map((incorrectAnswer, index) => (
          <button
            type="button"
            id="wrongAnswer"
            onClick={ showAnswer }
            key={ incorrectAnswer }
            data-testid={ `wrong-answer-${index}` }
          >
            { incorrectAnswer }
          </button>
        ))}
        <button
          type="button"
          id="rightAnswer"
          data-testid="correct-answer"
          key={ correctAnswer }
          onClick={ showAnswer }
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
