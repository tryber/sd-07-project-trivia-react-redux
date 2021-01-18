import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  CountDownAction,
  freezeTimeAction,
  nextQuestion,
  resetTimer,
  startTimeAction,
} from '../redux/actions/index';
import PlayTimer from './PlayTimer';
import RandomAnswer from './RandomAnswer';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.saveScoreLocalStorage = this.saveScoreLocalStorage.bind(this);
    this.feedbackOrNextQuestion = this.feedbackOrNextQuestion.bind(this);
    this.disableBtns = this.disableBtns.bind(this);
    this.enableBtnsQuestions = this.enableBtnsQuestions.bind(this);
    this.nextQuestionComponent = this.nextQuestionComponent.bind(this);
    this.cownDown = this.cownDown.bind(this);
  }

  setStateTimer() {
    const { timer, freezeTime, countDown } = this.props;

    if (timer === 0) {
      freezeTime();
      this.disableBtns();
    } else {
      countDown();
    }
  }

  cownDown() {
    const { startTimeDispatch } = this.props;
    const numberToSetInterval = 1000;
    const setIntervalState = setInterval(() => this.setStateTimer(), numberToSetInterval);
    startTimeDispatch(setIntervalState);
  }

  nextQuestionComponent() {
    const {
      nextQuestionDispatch,
      resetTimerDispatch,
      startTimeDispatch,
      setIntervalToClear,
    } = this.props;
    const numberToSetInterval = 1000;
    clearInterval(setIntervalToClear);
    const setIntervalState = setInterval(() => this.setStateTimer(), numberToSetInterval);
    startTimeDispatch(setIntervalState);
    nextQuestionDispatch();
    resetTimerDispatch();
  }

  saveScoreLocalStorage() {
    const { score, name, gravatarEmail, assertions } = this.props;
    const state = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  feedbackOrNextQuestion() {
    const { indexQuestion, setIntervalToClear } = this.props;
    const numberToComper = 4;
    if (indexQuestion === numberToComper) {
      clearInterval(setIntervalToClear);
      return (
        <Link to="/feedback">
          <button
            type="button"
            onClick={ () => {
              // this.saveScoreLocalStorage();
              this.enableBtnsQuestions();
            } }
            className="next-question"
            data-testid="btn-next"
          >
            Próxima
          </button>
        </Link>
      );
    }
    return (
      <button
        type="button"
        onClick={ () => {
          this.saveScoreLocalStorage();
          this.nextQuestionComponent();
          this.enableBtnsQuestions();
        } }
        className="next-question"
        data-testid="btn-next"
      >
        Próxima
      </button>
    );
  }

  disableBtns() {
    const correctAnswer = document.querySelector('.correct-answer');
    const wrongAnswers = document.querySelectorAll('.wrong-answer');

    correctAnswer.disabled = 'true';
    for (let index = 0; index < wrongAnswers.length; index += 1) {
      wrongAnswers[index].disabled = 'true';
    }
    const nextQuestionBtn = document.querySelector('.next-question');
    nextQuestionBtn.style.display = 'block';
  }

  enableBtnsQuestions() {
    const correctAnswer = document.querySelector('.correct-answer');
    const wrongAnswers = document.querySelectorAll('.wrong-answer');

    correctAnswer.disabled = 'false';
    for (let index = 0; index < wrongAnswers.length; index += 1) {
      wrongAnswers[index].disabled = 'false';
    }
  }

  render() {
    const { questions, currentQuestion } = this.props;
    console.log(questions);
    return (
      <div>
        <span>TRIVIA</span>
        <PlayTimer />
        {questions.length > 0 ? (
          <div key={ currentQuestion.question }>
            <h1
              data-testid="question-category"
            >
              {currentQuestion.category}
            </h1>
            <h2
              data-testid="question-text"
            >
              {currentQuestion.question}
            </h2>
            <RandomAnswer currentQuestion={ currentQuestion } />
            {this.feedbackOrNextQuestion()}
          </div>
        ) : (
          <h3>Loading</h3>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  setIntervalToClear: state.play.setIntervalState,
  questions: state.play.questions,
  currentQuestion: state.play.currentQuestion,
  status: state.play.status,
  timer: state.play.timer,
  indexQuestion: state.play.indexQuestion,
  score: state.login.score,
  name: state.login.name,
  assertions: state.login.assertions,
  gravatarEmail: state.login.email,
});

const mapDispatchToProps = (dispatch) => ({
  startTimeDispatch: (setIntervalState) => dispatch(startTimeAction(setIntervalState)),
  nextQuestionDispatch: () => dispatch(nextQuestion()),
  resetTimerDispatch: () => dispatch(resetTimer()),
  freezeTime: () => dispatch(freezeTimeAction()),
  countDown: () => dispatch(CountDownAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);

Trivia.propTypes = {
  startTimeDispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentQuestion: PropTypes.objectOf(PropTypes.array).isRequired,
  nextQuestionDispatch: PropTypes.func.isRequired,
  resetTimerDispatch: PropTypes.func.isRequired,
  freezeTime: PropTypes.func.isRequired,
  countDown: PropTypes.func.isRequired,
  setIntervalToClear: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  indexQuestion: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
};
