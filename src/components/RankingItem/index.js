import React, { Component } from 'react';
import { getStorage } from '../../services';
import './style.css';

class RankingItem extends Component {
  render() {
    const ranking = getStorage('ranking');
    ranking.sort((a, b) => {
      const change = 1;
      const dontChange = -1;
      if (a.score < b.score) return change;
      if (a.score > b.score) return dontChange;
      return 0;
    });
    return (
      <section className="ranking-section">
        {
          ranking.map(({ name, score }, index) => (
            <div key={ index } className="ranking">
              <div className="name">
                <span>{`${index + 1} -`}</span>
                <span>&nbsp;</span>
                <span data-testid={ `player-name-${index}` }>{` ${name}`}</span>
              </div>
              <div className="score">
                <span data-testid={ `player-score-${index}` }>{`${score} `}</span>
                <span>&nbsp;pontos</span>
              </div>
            </div>
          ))
        }
      </section>
    );
  }
}

export default RankingItem;
