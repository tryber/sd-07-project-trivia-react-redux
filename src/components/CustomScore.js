import React from 'react';
import { getStorage } from '../services';


export default function Scoreboard() {
  const { score } = getStorage('state');
  return (
    <spam data-testid="header-score">{score}</spam>
  );
}
