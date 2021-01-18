import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTime } from '../actions';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = { seconds: 30, stopedTime: 0 };
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
    this.sendTimeToState = this.sendTimeToState.bind(this);
    this.setStopedTime = this.setStopedTime.bind(this);
  }

  componentDidUpdate() {
    this.setStopedTime();
  }

  setStopedTime() {
    const { time } = this.props;
    const thirty = 30;
    if (time !== thirty) {
      this.setState({ stopedTime: time, seconds: thirty });
      this.timer = 0;
    }
  }

  countDown() {
    const { seconds } = this.state;
    const { timeToStore } = this.props;
    const secTime = seconds - 1;
    this.setState({
      seconds: secTime,
    });
    if (secTime === 0) {
      clearInterval(this.timer);
      timeToStore(secTime);
    }
  }

  sendTimeToState() {
    const { seconds } = this.state;
    const { timeToStore } = this.props;
    clearInterval(this.timer);
    timeToStore(seconds);
  }

  startTimer() {
    const thousand = 1000;
    const { seconds } = this.state;
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, thousand);
    }
  }

  render() {
    const { stop } = this.props;
    const { seconds, stopedTime } = this.state;
    if (!stop) {
      this.startTimer();
      return <div>{ seconds }</div>;
    }
    this.sendTimeToState();
    return <div>{ stopedTime }</div>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  timeToStore: (time) => dispatch(setTime(time)),
});

const mapStateToProps = (state) => ({
  time: state.questions.time,
});

Timer.propTypes = {
  time: PropTypes.func.isRequired,
  timeToStore: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
