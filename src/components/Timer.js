import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  render() {
    const { count } = this.props;
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
  count: PropTypes.bool.isRequired,
};

export default Timer;
