import React, { Component } from 'react';
import { getStorage } from '../services';

export default class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.setRanking();
  }

  setRanking() {
    this.setState({ ranking: getStorage('ranking') });
  }

  render() {
    const { ranking } = this.state;
    const { history: { push } } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Textinho</h1>
        <ol>
          {ranking.map(({ name, score, gravatarEmail }, index) => (
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
        <button type="button" data-testid="btn-go-home" onClick={ () => { push('/'); } }>
          Jogar novamente
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
