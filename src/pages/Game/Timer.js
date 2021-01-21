import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { throwTime, setScore } from '../../redux/actions';

class Timer extends Component {
  constructor() {
    super();
    this.displayTime = this.displayTime.bind(this);
    this.timerDecrement = this.timerDecrement.bind(this);
  }

  componentDidMount() {
    this.displayTime();
  }

  componentDidUpdate() {
    const { restart } = this.props;
    if (restart) {
      this.displayTime();
    }
  }

  timerDecrement() {
    const { timerValue, sendThrowTime } = this.props;
    const newTimer = timerValue - 1;
    sendThrowTime(newTimer);
  }

  displayTime() {
    const interval = 1000;
    // const a = this;
    const secondCounter = setInterval(() => {
      const { timerValue } = this.props;
      const { isAnswered, actionSetScore } = this.props;
      if (isAnswered || timerValue === 0) {
        clearInterval(secondCounter);
      }
      if (timerValue === 0) {
        actionSetScore(true, false, 0, 'none');
      }
      if (!isAnswered && timerValue !== 0) {
        this.timerDecrement();
      }
    }, interval);
  }

  render() {
    const { timerValue } = this.props;
    return (
      <div>
        { `Tempo restante: ${timerValue}` }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAnswered: state.questionAnswererd.isAnswered,
  timerValue: state.throwTimer,
});

const mapDispatchToProps = (dispatch) => ({
  sendThrowTime: (time) => dispatch(throwTime(time)),
  actionSetScore: (a, b, c) => dispatch(setScore(a, b, c)),
});

Timer.propTypes = {
  isAnswered: PropTypes.bool.isRequired,
  sendThrowTime: PropTypes.func.isRequired,
  actionSetScore: PropTypes.func.isRequired,
  timerValue: PropTypes.number.isRequired,
  restart: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
