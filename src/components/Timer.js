import React from 'react';
import { connect } from 'react-redux';
import { setTime } from '../actions';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = { seconds: 30, stopedTime: 0 };
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
    this.sendTimeToState = this.sendTimeToState.bind(this);
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      seconds: seconds,
    });
    if (seconds === 0) {
      clearInterval(this.timer);
      this.props.timeToStore(this.state.seconds);
    }
  }

  sendTimeToState() {
    const { seconds } = this.state;
    clearInterval(this.timer);
    this.props.timeToStore(seconds);
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  componentDidUpdate() {
    const { time } = this.props;
    if (time !== 30) {
      this.setState({ stopedTime: time, seconds: 30 });
      this.timer = 0;
    }
  }

  render() {
    const { stop } = this.props;
    if (!stop) {
      this.startTimer();
      return <div>{ this.state.seconds }</div>;
    }
    else {
      this.sendTimeToState();
      return <div>{ this.state.stopedTime }</div>;
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  timeToStore: (time) => dispatch(setTime(time)),
})

const mapStateToProps = (state) => ({
  time: state.questions.time,
});


export default connect(mapStateToProps, mapDispatchToProps)(Timer);
