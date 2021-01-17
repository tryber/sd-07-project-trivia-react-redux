import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
    this.counter = this.counter.bind(this);
  }

  componentDidMount() {
    this.counter();
  }

  counter() {
    const magicNumber = 1000;
    setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) this.setState({ timer: timer - 1 });
    }, magicNumber);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        {timer}
      </div>
    );
  }
}

export default Timer;
