import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  CountDownAction,
  freezeTimeAction,
  nextQuestion,
  resetTimer,
  startTimeAction,
} from '../redux/actions';

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
    const { timer, freezeTime, countDown, setIntervalState } = this.props;

    if (timer === 0) {
      freezeTime();
      this.disableBtns();
      clearInterval(setIntervalState);
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
    const { startTimeActionDispatch } = this.props;
    const numberToSetInterval = 1000;
    const setIntervalState = setInterval(() => this.setStateTimer(), numberToSetInterval);
    startTimeActionDispatch(setIntervalState);
  }

  render() {
    const { timer } = this.props;
    return (
      <div>
        <p>
          Tempo:
          {timer}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  setIntervalState: state.play.setIntervalState,
  indexQuestions: state.play.indexQuestion,
  timer: state.play.timer,
});

const mapDispatchToProps = (dispatch) => ({
  nextQuestionAction: () => dispatch(nextQuestion()),
  resetTimer: () => dispatch(resetTimer()),
  countDown: () => dispatch(CountDownAction()),
  freezeTime: () => dispatch(freezeTimeAction()),
  startTimeActionDispatch: (setIntervalState) => {
    dispatch(startTimeAction(setIntervalState));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayTimer);

PlayTimer.propTypes = {
  timer: PropTypes.number.isRequired,
  freezeTime: PropTypes.func.isRequired,
  countDown: PropTypes.func.isRequired,
  setIntervalState: PropTypes.number.isRequired,
  startTimeActionDispatch: PropTypes.func.isRequired,
};
