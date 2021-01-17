import React, { Component } from 'react';
import propTypes from 'prop-types';

class RankingItem extends Component {
  render() {
    const { player, index } = this.props;
    const { picture, name, score } = player;
    return (
      <li>
        <img src={ picture } alt={ name } />
        <p data-testid={ `player-name-${index}` }>
          { name }
        </p>
        <p data-testid={ `player-score-${index}` }>
          { score }
        </p>
      </li>
    );
  }
}

export default RankingItem;

RankingItem.propTypes = {
  imageSrc: propTypes.string,
  name: propTypes.string,
  score: propTypes.number,
  index: propTypes.number,
}.isRequired;
