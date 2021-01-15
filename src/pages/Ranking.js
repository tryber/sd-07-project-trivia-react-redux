import React from 'react';
import { Link } from 'react-router-dom'

class Ranking extends React.Component {

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const ordenedRanking = ranking.sort((a, b) => b.score - a.score);

    return (
      <div>
        <h1 data-testid='ranking-title'>Tela do ranking</h1>
        <ul>
          {ordenedRanking.map((ranking, index) => (
            <li key={ index }>
              <p data-testid={ `player-name-${index}` }>{`${ranking.name}`}</p>
              <p data-testid={ `player-score-${index}` }>{`${ranking.score}`}</p>
            </li>
          ))}
        </ul>
        <Link data-testid='btn-go-home' to='/'>
          Go to Home
        </Link>
      </div>
    );
  }
}

export default Ranking;
