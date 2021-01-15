import React, { Component } from 'react';

export default class CustomTimer extends Component {
  componentDidMount() {
    const { timerInit } = this.props;
    timerInit();
  }

  render() {
    const { time } = this.props;
    return (
      <span>{time}</span>
    );
  }
}

CustomTimer.propTypes = {
  timerInit: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
};
