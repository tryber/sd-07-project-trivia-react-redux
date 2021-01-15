import React from 'react';
import { getStorage } from '../services';


export default function Scoreboard() {
  const { score = 0 } = getStorage('player');
  return (
    <spam data-testid="header-score">{score}</spam>
  );
}
