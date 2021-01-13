import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const orderedRanking = ranking.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking Page</h1>
        <Link to="/" data-testid="btn-go-home">Voltar para Login Page</Link>
        {orderedRanking.map((item, index) => {
          const { name, score, picture } = item;
          return (
            <div key={ index }>
              <img
                src={ picture }
                data-testid={ `player-picture-${index}` }
                alt="Avatar player"
              />
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <p data-testid={ `player-score-${index}` }>{score}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Ranking;
