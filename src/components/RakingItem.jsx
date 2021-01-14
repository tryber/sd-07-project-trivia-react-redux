import React, { Component } from 'react';
import propTypes from 'prop-types';

class RankingItem extends Component {
  render() {
    const { imageSrc, name, score, index } = this.props;
    return (
      <li>
        <img src={ imageSrc } alt={ name } />
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
