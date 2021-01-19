import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveTimer } from '../redux/actions';
import './Timer.css';

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
    const { answerColor } = this.props;
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
    const { timer } = this.state;
    const { resetTimer, restoreTimer, saveTime } = this.props;
    if (resetTimer) {
      saveTime(timer);
      this.setState({
        timer: 30,
      }, restoreTimer);
    }
  }

  render() {
    const { timer } = this.state;
    return (
      <div className="timer">
        Remaining time:
        {' '}
        {timer}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveTime: (info) => dispatch(saveTimer(info)),
});

Timer.propTypes = {
  answerColor: PropTypes.func.isRequired,
  restoreTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.bool.isRequired,
  saveTime: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);
