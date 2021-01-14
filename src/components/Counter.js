import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.counterFunc = this.counterFunc.bind(this);
    this.state = {
      count: 30,
    };
  }

  componentDidMount() {
    this.counterFunc();
  }

  componentDidUpdate() {
    const { clicked, next } = this.props;
    const { count } = this.state;
    if (count === 0 || clicked) clearInterval(this.timer);
  }

  counterFunc() {
    const second = 1000;
    this.timer = setInterval(() => {
      this.setState(({ count: counter }) => ({ count: counter - 1 }));
    }, second);
  }

  render() {
    const { count } = this.state;
    return <p>{ count }</p>;
  }
}

export default Counter;
