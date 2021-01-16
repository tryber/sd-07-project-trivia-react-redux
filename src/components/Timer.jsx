import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { totalTime, countDown } from '../actions';
import Clock from './Clock';

class Timer extends Component {
  render() {
    const { sendTimeOut, lessTime } = this.props;
    sendTimeOut();
    lessTime();
    return (
      <div className="timer-container">
        <Clock />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  click: state.questions.click,
  disable: state.timer.disable,
});

const mapDispatchToProps = (dispatch) => ({
  sendTimeOut: () => dispatch(totalTime()),
  lessTime: () => dispatch(countDown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  sendTimeOut: propTypes.func,
  click: propTypes.string,
}.isRequired;
