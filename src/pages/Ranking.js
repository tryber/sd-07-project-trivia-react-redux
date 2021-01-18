import React, { Component } from 'react';
import '../css/Ranking.css';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();
    this.goToLogin = this.goToLogin.bind(this);
  }

  goToLogin() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="ranking-container">
        <h1 data-testid="ranking-title">RANKING SCREEN</h1>
        <ol>
          {ranking.map((player, index) => (
            <li key="li">
              <div key={ player } className="flex-box-ranking">
                <img keyclassName="ranking-user-img" src={ player.picture } alt="img" />
                <span data-testid={ `player-name-${index}` }>
                  {' '}
                  {player.name}
                </span>
                {' '}
                -
                <span key="playerScore" data-testid={ `player-score-${index}` }>
                  {player.score}
                  {' '}
                  pontos
                </span>
              </div>
            </li>))}
        </ol>

        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goToLogin }
        >
          JOGAR NOVAMENTE
        </button>
      </div>
    );
  }
}

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
