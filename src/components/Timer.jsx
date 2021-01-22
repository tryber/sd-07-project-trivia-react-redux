import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Timer({ time, answered, setAnswered, onChangeTime }) {
  const resetTime = 30;
  const second = 1000;

  useEffect(() => {
    let timerResetCode;

    if (!answered && time > 0) {
      timerResetCode = setInterval(() => onChangeTime(time - 1), second);
    }

    if (!answered && time === 0) {
      setAnswered(true);
    }

    if (answered) {
      onChangeTime(resetTime);
    }

    return () => clearInterval(timerResetCode);
  }, [time, answered, setAnswered, onChangeTime]);
  return (
    <div>
      <h2>Tempo restante:</h2>
      <span>{time}</span>
    </div>
  );
}

Timer.propTypes = {
  answered: PropTypes.bool.isRequired,
  setAnswered: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  onChangeTime: PropTypes.func.isRequired,
};

export default Timer;
