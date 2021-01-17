import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();
    this.state = { currentTimer: 30 };
    this.timerID = 0;
    this.clearTimer = this.clearTimer.bind(this);
    this.initialTimer = this.initialTimer.bind(this);
  }

  componentDidMount() {
    const numberTimer = 1000;
    const { currentTimer } = this.state;
    if (this.timerID <= 0 && currentTimer > 0) {
      this.timerID = setInterval(
        () => this.tick(),
        numberTimer,
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const { currentTimer } = this.state;
    if (currentTimer === 0) return this.clearTimer();
    this.initialTimer();
  }

  initialTimer() {
    this.setState((prevState) => ({
      currentTimer: prevState.currentTimer - 1,
    }));
  }

  clearTimer() {
    const { failTime } = this.props;
    clearInterval(this.timerID);
    failTime();
  }

  render() {
    const { currentTimer } = this.state;

    return (
      <p>{ currentTimer }</p>
    );
  }
}

Timer.propTypes = {
  failTime: PropTypes.func.isRequired,
};

export default Timer;
