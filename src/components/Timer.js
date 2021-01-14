import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
    };

    this.reloadTimer = this.reloadTimer.bind(this);
  }

  componentDidMount() {
    const interval = 1000;
    setInterval(this.reloadTimer, interval);
  }

  reloadTimer() {
    const { timer } = this.state;
    const { answerColor, nextButton } = this.props;
    if (timer > 0) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }), this.checkIfAnswered);
    } else {
      answerColor();
      this.setState({
        timer: 30,
      });
    }
  }

  checkIfAnswered() {
    const { resetTimer, restoreTimer } = this.props;
    if (resetTimer) {
      this.setState({
        timer: 30,
      }, restoreTimer);
    }
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        Tempo restante:
        {timer}
      </div>
    );
  }
}

Timer.propTypes = {
  answerColor: PropTypes.func.isRequired,
};

export default Timer;
