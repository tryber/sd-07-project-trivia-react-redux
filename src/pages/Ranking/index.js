import React from 'react';
import { HomeButton } from '../../components';

const Ranking = () => {
  const rank = JSON.parse(localStorage.getItem('ranking'));
  const orderRank = rank.sort(({ score: a }, { score: b }) => b - a);

  return (
    <>
      <h1 data-testid="ranking-title">Tela de Ranking</h1>
      <HomeButton test="btn-go-home" />
      { orderRank.map(({ name, score }, index) => (
        <p key={ `${name}-${score}` }>
          <span data-testid={ `player-name-${index}` }>{name}</span>
          <span data-testid={ `player-score-${index}` }>{score}</span>
        </p>
      ))}
    </>
  );
};
export default Ranking;
