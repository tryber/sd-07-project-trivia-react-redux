import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Timer extends Component {
  render() {
    const { timer } = this.props;
    return (
      <section className="timer-section">
        <div className="timer-circle">
          <div className="timer">{ timer }</div>
        </div>
      </section>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
};

export default Timer;
