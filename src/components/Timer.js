import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 30,
    };
    this.myTime = this.myTime.bind(this);
  }

  componentDidMount() {
    this.myTime();
  }

  myTime() {
    const timerResponse = setInterval(() => {
      this.setState((prevSate) => ({
        count: prevSate.count - 1,
      }));
      const { count } = this.state;
      const { disable } = this.props;
      if (count === 0) {
        disable();
        clearInterval(timerResponse);
      }
      // eslint-disable-next-line no-magic-numbers
    }, 1000);
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <h3>
          Seu Tempo:
          {count}
        </h3>
      </div>
    );
  }
}

Timer.propTypes = {
  disable: PropTypes.bool.isRequired,
};

export default Timer;
