import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { throwTime, questionAnswered } from '../../redux/actions';

class Timer extends Component {
  constructor() {
    super();

    this.displayTime = this.displayTime.bind(this);
    this.timerDecrement = this.timerDecrement.bind(this);

    this.state = {
      timerValue: 30,
    };
  }

  componentDidMount() {
    this.displayTime();
  }

  timerDecrement() {
    const { timerValue } = this.state;
    const newTimer = timerValue - 1;
    this.setState({
      timerValue: newTimer,
    });
  }

  // const a = this; https://stackoverflow.com/questions/26348557/issue-accessing-state-inside-setinterval-in-react-js/26348653
  displayTime() {
    const interval = 1000;
    // const a = this;
    const secondCounter = setInterval(() => {
      this.timerDecrement();
      const { timerValue } = this.state;
      const { isAnswered, sendThrowTime, disableAnswer } = this.props;
      if (timerValue === 0 || isAnswered) {
        clearInterval(secondCounter);
        sendThrowTime(timerValue);
        disableAnswer();
      }
    }, interval);
  }

  render() {
    const { timerValue } = this.state;
    return (
      <div>
        { `Tempo restante: ${timerValue}` }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAnswered: state.questionAnswererd.isAnswered,
});

const mapDispatchToProps = (dispatch) => ({
  sendThrowTime: (time) => dispatch(throwTime(time)),
  disableAnswer: () => dispatch(questionAnswered()),
});

Timer.propTypes = {
  isAnswered: PropTypes.bool.isRequired,
  sendThrowTime: PropTypes.func.isRequired,
  disableAnswer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
