import React from 'react';
import { getStorage } from '../services';

export default function Scoreboard() {
  const { score } = getStorage('player');
  return (
    <spam>{score}</spam>
  );
}
