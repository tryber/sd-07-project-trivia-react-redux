import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor() {
    super();

    this.state = { counter: 30 };
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    const second = 1000;
    this.interval = setInterval(() => {
      this.countDown();
    }, second);
  }

  countDown() {
    const { counter } = this.state;
    const { disable } = this.props;
    if (counter > 0) {
      this.setState({ counter: counter - 1 });
    } else {
      disable();
    }
  }

  render() {
    const { counter } = this.state;
    return (
      <div>{counter}</div>
    );
  }
}

Timer.propTypes = {
  disable: PropTypes.func.isRequired,
};

export default Timer;
