import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.counterFunc = this.counterFunc.bind(this);
    this.state = {
      count: 5,
    };
  }

  componentDidMount() {
    this.counterFunc();
  }

  counterFunc() {
    const { count } = this.state;
    const second = 1000;
    this.timer = setInterval(() => {
      if (count === 0) clearInterval(this.timer);
      this.setState(({ count: counter }) => ({ count: counter - 1 }));
    }, second);
  }

  render() {
    const { count } = this.state;
    return <p>{ count }</p>;
  }
}

export default Counter;
