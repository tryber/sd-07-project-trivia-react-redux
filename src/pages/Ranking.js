import React, { Component } from 'react';
import { getStorage } from '../services';

export default class Ranking extends Component {
  componentDidMount() {
    this.ranking = getStorage('ranking')
  }

  render() {
    return (
      <ol>
        {this.ranking.map(({ name, score, gravatarEmail }, index) => (
          <li key={ index }>
            <div>
              <img
                data-testid="header-profile-picture"
                src={ gravatarEmail }
                alt="avatar"
              />
              <spam data-testid={ `player-name-${index}` }>{ name }</spam>
              <spam data-testid={ `player-score-${index}` }>{ score }</spam>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}

CustomRanking.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
