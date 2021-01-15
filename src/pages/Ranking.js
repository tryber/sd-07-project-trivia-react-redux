import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRank } from '../services/handleRank';

export default class Ranking extends Component {
  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        {getRank().map((person, index) => (
          <div key={ index }>
            <span data-testid={ `player-name-${index}` }>
              {person.name}
            </span>
            <span data-testid={ `player-score-${index}` }>{person.Score}</span>
          </div>
        ))}
        <Link data-testid="btn-go-home" to="/">Home</Link>
      </div>
    );
  }
}
