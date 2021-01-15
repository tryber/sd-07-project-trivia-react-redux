import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RankingItem extends Component {
  render() {
    const { player, index } = this.props;
    const { name, score, picture } = player;
    return (
      <li key={ index }>
        <img src={ picture } alt="player" />
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>
          {score}
          {' '}
          pontos
        </p>
      </li>
    );
  }
}

RankingItem.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RankingItem;
