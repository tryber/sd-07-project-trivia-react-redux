import React, { Component } from 'react';
import { countdown } from '../services';

export default class Timer extends Component {
  constructor() {
    super();
    this.state = {
      time: 30,
    };
  }

  componentDidMount() {
    this.timer();
  }

  timer() {
    countdown((stop) => this.setState(({ time }) => (
      time ? { time: time - 1 } : stop()
    )));
  }

  render() {
    const { time } = this.state;
    return (
      <span>{time}</span>
    );
  }
}
