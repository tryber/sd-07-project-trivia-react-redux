import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CountDownAction, freezeTimeAction, nextQuestion, resetTimer } from '../redux/actions';

class PlayTimer extends Component {
  constructor() {
    super();
    this.disableBtns = this.disableBtns.bind(this);
    this.setStateTimer = this.setStateTimer.bind(this);
    this.cownDown = this.cownDown.bind(this);
  }

  componentDidMount() {
    this.cownDown();
  }

  setStateTimer() {
    const { timer, freezeTime, countDown } = this.props;

    if (timer === 0) {
      freezeTime()
      this.disableBtns();
    } else {
      countDown();
    }
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

  cownDown() {
    const numberToSetInterval = 1000;
    setInterval(() => this.setStateTimer(), numberToSetInterval);
  }

  render() {
    const { timer } = this.props;
    return (
      <div>
        <p>{timer}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  indexQuestions: state.play.indexQuestion,
  timer: state.play.timer,
});

const mapDispatchToProps = (dispatch) => ({
  nextQuestionAction: () => dispatch(nextQuestion()),
  resetTimer: () => dispatch(resetTimer()),
  countDown: () => dispatch(CountDownAction()),
  freezeTime: () => dispatch(freezeTimeAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayTimer);
