import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { resetTimerAction } from '../Redux/actions';

function Timer() {
  const trinta = 30;
  const mil = 1000;
  const [count, setCount] = useState(trinta);
  const { resetCount } = useSelector((state) => state.gameReducer.resetCount);
  useEffect(() => {
    const timer = count > 0 && setInterval(() => setCount(count - 1), mil);
    if (resetCount) {
      setCount(trinta);
    }
    return () => clearInterval(timer);
  }, [count]);
  return (
    <div>
      <h2>Tempo restante</h2>
      <h1>{count}</h1>
    </div>
  );
}

export default Timer;
