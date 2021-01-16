import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveTimer } from '../actions';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };

    this.count = this.count.bind(this);
    this.shareTimer = this.shareTimer.bind(this);
  }

  componentDidMount() {
    const { timer } = this.state;
    if (timer >= 0) {
      const interval = 1000;
      setInterval(this.count, interval);
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
      this.setState({
        timer: 0,
      });
    }
  }

  shareTimer() {
    const { timer } = this.state;
    const { saveTime } = this.props;
    saveTime(timer);
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
  saveTime: (times) => dispatch(saveTimer(times)),
});

Timer.propTypes = {
  saveTime: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);
