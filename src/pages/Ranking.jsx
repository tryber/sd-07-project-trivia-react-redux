import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          <li>
            <img
              src="#"
              alt="#"
            />
            Nome:
            <span data-testid="player-name-1">player.name1</span>
            Score:
            <span data-testid="player-score-1">player.score1</span>
          </li>
          <li>
            <img
              src="#"
              alt="#"
            />
            Nome:
            <span data-testid="player-name-2">player.name2</span>
            Score:
            <span data-testid="player-score-2">player.score2</span>
          </li>
        </ul>
        <Link to="/" data-testid="btn-go-home">
          <button type="button">Login</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
