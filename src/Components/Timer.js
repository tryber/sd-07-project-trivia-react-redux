import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { finalTime, secondsLeft } from '../actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      contagem: 30,
      disable: false,
    };
    this.setContagem = this.setContagem.bind(this);
    this.sendDisableTrue = this.sendDisableTrue.bind(this);
  }

  componentDidMount() {
    const sec = 1000;
    setInterval(this.setContagem, sec);
  }

  setContagem() {
    const { contagem } = this.state;
    const { secondsProps } = this.props;
    if (contagem > 0) {
      this.setState((anterior) => ({
        ...anterior,
        contagem: anterior.contagem - 1,
      }));
      secondsProps(contagem);
    } else {
      this.setState({
        contagem: 0,
        disable: true,
      });
      this.sendDisableTrue();
    }
  }

  sendDisableTrue() {
    const { disable } = this.state;
    const { time } = this.props;
    time(disable);
  }

  render() {
    const { contagem } = this.state;
    return (
      <div>
        <span>{`Timer: ${contagem}`}</span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  time: (disable) => dispatch(finalTime({ disable })),
  secondsProps: (seconds) => dispatch(secondsLeft(seconds)),
});

Timer.propTypes = {
  time: PropTypes.bool.isRequired,
  secondsProps: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);
