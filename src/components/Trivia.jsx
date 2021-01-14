import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nextQuestion, resetTimer } from '../redux/actions/index';
import PlayTimer from './PlayTimer';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.enableBtnsQuestions = this.enableBtnsQuestions.bind(this);
    this.changeBorderColor = this.changeBorderColor.bind(this);
    this.randomArrayQuestions = this.randomArrayQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.showNextQuestionBtn = this.showNextQuestionBtn.bind(this);
  }

  changeBorderColor() {
    const correctAnswer = document.querySelector('.correct-answer');
    const wrongAnswers = document.querySelectorAll('.wrong-answer');

    correctAnswer.style.border = '3px solid rgb(6, 240, 15)';

    for (let index = 0; index < wrongAnswers.length; index += 1) {
      wrongAnswers[index].style.border = '3px solid rgb(255, 0, 0)';
    }
  }

  showNextQuestionBtn() {
    const nextQuestionBtn = document.querySelector('.next-question');
    nextQuestionBtn.style.display = 'block';
  }

  nextQuestion() {
    const { nextQuestion, resetTimer } = this.props;
    nextQuestion();
    resetTimer();
  }

  enableBtnsQuestions() {
    const correctAnswer = document.querySelector('.correct-answer');
    const wrongAnswers = document.querySelectorAll('.wrong-answer');

    correctAnswer.disabled = 'false';
    for (let index = 0; index < wrongAnswers.length; index += 1) {
      wrongAnswers[index].disabled = 'false';
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
        <PlayTimer />
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
                  onClick={ () => {
                    this.changeBorderColor();
                    this.showNextQuestionBtn();
                  } }
                >
                  { element }
                </button>))}
            <button
              type="button"
              onClick={ () => {
                this.nextQuestion();
                this.enableBtnsQuestions();
              }}
              className="next-question"
              data-testid="btn-next"
            >
              Próxima
            </button>
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

const mapDispatchToProps = (dispatch) => ({
  nextQuestion: () => dispatch(nextQuestion()),
  resetTimer: () => dispatch(resetTimer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);

Trivia.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentQuestion: PropTypes.objectOf(PropTypes.array).isRequired,
};
