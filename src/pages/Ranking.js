import React, { Component } from 'react';
import * as components from '../components';
import recoveryProductsFromLocalStorage from '../services/localStorageFunctions';

class Ranking extends Component {
  render() {
    // const { ranking } = this.state;
    const ranking = recoveryProductsFromLocalStorage();
    console.log(ranking);
    const compareNumber = 0;

    if (
      ranking.length !== compareNumber
      || ranking !== undefined
      || ranking !== null
    ) {
      return (
        <div>
          <h1 data-testid="ranking-title">Ranking</h1>
          <ul>
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
