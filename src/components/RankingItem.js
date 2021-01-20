import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RankingItem.css';

class RankingItem extends Component {
  render() {
    const { player, index } = this.props;
    const { name, score, picture } = player;
    return (
      <li key={ index } className="ranking-item">
        <div>
          <img
            src={ picture }
            alt="player"
            className="profile-picture picture-ranking"
          />
        </div>
        <div>
          <p data-testid={ `player-name-${index}` } className="player-name">{name}</p>
          <p data-testid={ `player-score-${index}` }>
            {score}
            {' '}
            points
          </p>
        </div>

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
