import React, { Component } from 'react';
import * as components from '../components';
import rankingLocalStorage from '../services/localStorageFunctions';
import './Ranking.css';

class Ranking extends Component {
  render() {
    // const { ranking } = this.state;
    const ranking = rankingLocalStorage();
    console.log(ranking);
    const compareNumber = 0;

    if (
      ranking.length !== compareNumber
      || ranking !== undefined
      || ranking !== null
    ) {
      return (
        <div className="ranking-page">
          <h1 data-testid="ranking-title">Ranking</h1>
          <ul className="ranking-list">
            {ranking
              .sort((first, second) => second.score - first.score)
              .map((player, index) => (
                <components.RankingItem
                  player={ player }
                  key={ index }
                  index={ index }
                />
              ))}
          </ul>
          <components.ButtonLogin />
        </div>
      );
    }
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <components.ButtonLogin />
      </div>
    );
  }
}

export default Ranking;
