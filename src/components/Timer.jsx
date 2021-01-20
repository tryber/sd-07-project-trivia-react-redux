import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Timer({ answered, setAnswered }) {
  const time = 30;
  const second = 1000;

  const [count, setCount] = useState(time);

  useEffect(() => {
    let timerResetCode;

    if (!answered && count > 0) {
      timerResetCode = setInterval(() => setCount(count - 1), second);
    }

    if (!answered && count === 0) {
      setAnswered(true);
    }

    if (answered) {
      setCount(time);
    }

    return () => clearInterval(timerResetCode);
  }, [count, answered, setAnswered]);
  return (
    <div>
      <h2>Tempo restante:</h2>
      <span>{count}</span>
    </div>
  );
}

Timer.propTypes = {
  answered: PropTypes.bool.isRequired,
  setAnswered: PropTypes.bool.isRequired,
};

export default Timer;
