import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Clock extends Component {
  render() {
    const { time } = this.props;
    return (<h1 className="timer">{ time }</h1>);
  }
}

const mapStateToProps = (state) => ({
  time: state.timer.time,
});

export default connect(mapStateToProps)(Clock);

Clock.propTypes = {
  time: propTypes.number,
}.isRequired;
