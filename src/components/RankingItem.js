import React, { Component } from 'react';

class RankingItem extends Component {
  render() {
    const { player } = this.props;
    const { name, score, picture, index } = player;
    return (
      <>
          <li key={ index }>
            <img src={ picture } alt='player' />
            <p data-testid={`player-name-${index}`}>{ name }</p>
            <p data-testid={`player-score-${index}`}>Fez { score } pontos</p>
          </li>
      </>
    );
  }
}

export default RankingItem;
