import React from 'react';
import { getStorage } from '../services';

export default function Scoreboard() {
  const storage = getStorage('state');
  const score = storage ? storage.score : 0;
  return (
    <spam data-testid="header-score">{score}</spam>
  );
}
