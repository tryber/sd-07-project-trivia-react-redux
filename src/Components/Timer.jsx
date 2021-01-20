import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveTimer } from '../actions';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      onLoad: false,
    };

    this.count = this.count.bind(this);
    this.shareTimer = this.shareTimer.bind(this);
    this.isTimer = this.isTimer.bind(this);
  }

  componentDidMount() {
    const { timer } = this.state;
    if (timer >= 0) {
      const interval = 1000;
      const preInterval = 5000;
      setTimeout(() => {
        setInterval(this.count, interval);
      }, preInterval);
    }
  }

  isTimer() {
    const { timer } = this.props;
    if (timer === 0) {
      this.setState({
        onLoad: true,
      });
      this.shareTimer();
    }
  }

  count() {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
      this.shareTimer();
    } else {
      // Function color answer here
      this.isTimer();
      this.setState({
        timer: 0,
      });
    }
  }

  shareTimer() {
    const { timer, onLoad } = this.state;
    const { saveTime } = this.props;
    saveTime(timer, onLoad);
  }

  render() {
    const { timer } = this.state;
    return (
      <div className="timer">
        { timer }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveTime: (times, onLoad) => dispatch(saveTimer(times, onLoad)),
});

const mapStateToProps = (state) => ({
  timer: state.timer.timer,
});

Timer.propTypes = {
  saveTime: PropTypes.func.isRequired,
  timer: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
