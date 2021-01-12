import React from 'react';

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
    if (counter > 0) {
      this.setState({ counter: counter - 1 });
    }
  }

  render() {
    const { counter } = this.state;
    return (
      <div>{counter}</div>
    );
  }
}

export default Timer;
