import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.count = this.count.bind(this);
  }

  count() {
    const initialValue = 30;
    const actualValue = initialValue - 1;
    return actualValue;
  }

  render() {
    const timer = 1000;
    return (
      <div className="timer">
        { setInterval(this.count, timer)}
      </div>
    );
  }
}

export default Timer;
