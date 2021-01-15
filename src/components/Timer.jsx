import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { timer } from '../actions';

class Timer extends Component {
  constructor() {
    super();

    this.setTimer = this.setTimer.bind(this);
  }

  setTimer() {
    const { sendTimeOut } = this.props;
    const time = 30000;
    setTimeout(() => {
      const { click } = this.props;
      if (click === '') return sendTimeOut();
    }, time);
  }

  render() {
    this.setTimer();
    return (
      <div className="timer-container">
        <h1 className="timer">30</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  click: state.questions.click,
});

const mapDispatchToProps = (dispatch) => ({
  sendTimeOut: () => dispatch(timer()) });

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  sendTimeOut: propTypes.func,
  click: propTypes.string,
}.isRequired;
