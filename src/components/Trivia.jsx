import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.changeBorderColor = this.changeBorderColor.bind(this);
    this.randomArrayQuestions = this.randomArrayQuestions.bind(this);
  }

  changeBorderColor() {
    const correctAnswer = document.querySelector('.correct-answer');
    const wrongAnswers = document.querySelectorAll('.wrong-answer');

    correctAnswer.style.border = '3px solid rgb(6, 240, 15)';

    for (let index = 0; index < wrongAnswers.length; index += 1) {
      wrongAnswers[index].style.border = '3px solid rgb(255, 0, 0)';
    }
  }

  randomArrayQuestions(string, array) {
    const newArray = [...array, string];
    for (let i = newArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray;
  }

  render() {
    const { questions, currentQuestion } = this.props;

    return (
      <div>
        <span>TRIVIA</span>
        {questions.length > 0 ? (
          <div key={ currentQuestion.question }>
            <h1
              data-testid="question-category"
            >
              { currentQuestion.category }
            </h1>
            <h2
              data-testid="question-text"
            >
              { currentQuestion.question }
            </h2>
            {this.randomArrayQuestions(currentQuestion
              .correct_answer, currentQuestion.incorrect_answers)
              .map((element, indice) => (
                <button
                  key={ indice }
                  type="button"
                  data-testid={ element === currentQuestion.correct_answer
                    ? 'correct-answer' : `wrong-answer-${indice}` }
                  className={ element === currentQuestion.correct_answer
                    ? 'correct-answer'
                    : 'wrong-answer' }
                  onClick={ () => this.changeBorderColor() }
                >
                  { element }
                </button>))}
          </div>
        ) : (
          <h3>Loading</h3>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.play.questions,
  currentQuestion: state.play.currentQuestion,
  status: state.play.status,
});

export default connect(mapStateToProps)(Trivia);

Trivia.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentQuestion: PropTypes.objectOf(PropTypes.array).isRequired,
};
