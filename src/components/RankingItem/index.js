import React, { Component } from 'react';
import { getStorage } from '../../services';
import './style.css';

class RankingItem extends Component {
  render() {
    const ranking = getStorage('ranking');
    console.log(ranking);
    ranking.sort((a, b) => {
      const change = 1;
      const dontChange = -1;
      if (a.score < b.score) return change;
      if (a.score > b.score) return dontChange;
      return 0;
    });
    console.log(ranking);
    return (
      <section className="ranking-section">
        {
          ranking.map(({ picture, name, score }, index) => (
            <div key={ index } className="ranking">
              <div className="name">
                <img src={ picture } alt={ `Avatar de ${name}` } className="picture" />
                <span>{`${index + 1} -`}</span>
                <span>&nbsp;</span>
                <h2
                  className="header-name"
                  data-testid={ `player-name-${index}` }
                >
                  { name }
                </h2>
              </div>
              <div className="score">
                <h3
                  className="header-score"
                  data-testid={ `player-score-${index}` }
                >
                  { score }
                </h3>
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
