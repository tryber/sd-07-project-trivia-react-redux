import React, { Component } from 'react';
import { countdown } from '../services';

export default class CustomTimer extends Component {
  constructor() {
    super();
    this.state = {
      time: 30,
    };
  }

  componentDidMount() {
    this.timerInit();
  }

  componentDidUpdate() {
    this.stopNow();
  }

  stopNow() {
    const { stopTimer } = this.props;
    if (stopTimer) clearInterval(this.timer);
  }

  timerInit() {
    this.timer = countdown((stop) => {
      this.setState(({ time }) => (
        time
          ? { time: time - 1 }
          : stop(this.timer)
      ));
    });
  }

  render() {
    const { time } = this.state;
    return (
      <span>{time}</span>
    );
  }
}
