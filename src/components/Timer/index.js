import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 10,
    };

    this.timer = 0;
    this.TIME_INTERVAL = 1000;

    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer() {
    const { seconds } = this.state;
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, this.TIME_INTERVAL);
    }
  }

  stopTimer() {
    clearInterval(this.timer);
    const { seconds } = this.state;
    return seconds;
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    const { seconds } = this.state;
    const { handleTimeOver } = this.props;

    if (seconds === 0) {
      this.stopTimer();
      handleTimeOver();
    } else {
      const newSeconds = seconds - 1;
      this.setState({
        seconds: newSeconds,
      });
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        {`Tempo: ${seconds} `}
      </div>
    );
  }
}

Timer.propTypes = {
  handleTimeOver: PropTypes.func.isRequired,
};

export default Timer;
