import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { gameActions } from '../../actions';

class GameTimer extends Component {
  constructor() {
    super();
    this.state = {
      count: 30,
    };
    this.handleTimer = this.handleTimer.bind(this);
    this.timerInterval = this.timerInterval.bind(this);
  }

  componentDidMount() {
    this.timerInterval();
  }

  timerInterval() {
    const oneSecond = 1000;
    const timer = setInterval(() => this.handleTimer(), oneSecond);
    return timer;
  }

  handleTimer() {
    const { count } = this.state;
    const { timerZero, clicked, updateTime } = this.props;
    if (clicked) return (updateTime(count));
    if (count > 0) {
      this.setState({
        count: count - 1,
      });
    } else {
      timerZero();
    }
  }

  render() {
    const { count } = this.state;
    return (
      <div className="timer">
        { count }
      </div>
    );
  }
}

GameTimer.propTypes = {
  timerZero: propTypes.func.isRequired,
  clicked: propTypes.func.isRequired,
  updateTime: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateTime: (payload) => dispatch(gameActions.updateTime(payload)),
});

export default connect(null, mapDispatchToProps)(GameTimer);
