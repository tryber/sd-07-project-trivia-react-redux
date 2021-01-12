import React, { Component } from 'react';
import * as components from '../components';

class Ranking extends Component {
    constructor() {
        super();
        this.state = {
            ranking: [
                {
                    name: 'Denner',
                    score: '10',
                    picture: 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/87871.webp?w=710&h=1059'
                },
                {
                    name: 'Andressa',
                    score: '20',
                    picture: 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/87871.webp?w=710&h=1059'
                },
                {
                    name: 'Adinelson',
                    score: '30',
                    picture: 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/87871.webp?w=710&h=1059'
                },
            ]
        }
        this.orderRanking = this.orderRanking.bind(this);
    }

    orderRanking() {
        const { ranking } = this.state;
        if(ranking.length > 0) {
            const result = ranking.sort((first, second) => second.score - first.score)
            this.setState({
                ranking: result,
            })
        }
    }
  render() {
      const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <components.ButtonLogin />
        <ul>
        {ranking.sort((first, second) => second.score - first.score).map((player) => < components.RankingItem player={player} />)}
        </ul>
      </div>
    );
  }
}

export default Ranking;
