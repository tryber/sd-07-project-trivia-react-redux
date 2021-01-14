import React from 'react';
import PropTypes from 'prop-types';

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

  counterFunc() {
    const second = 1000;

    this.timer = setInterval(() => {
      const { count } = this.state;
      const { clicked, isClicked } = this.props;

      if (count === 1 || clicked) {
        clearInterval(this.timer);
        isClicked();
      }
      this.setState(({ count: counter }) => ({ count: counter - 1 }));
    }, second);
  }

  render() {
    const { count } = this.state;

    return <p>{ count }</p>;
  }
}

Counter.propTypes = {
  clicked: PropTypes.bool.isRequired,
  isClicked: PropTypes.func.isRequired,
};

export default Counter;
