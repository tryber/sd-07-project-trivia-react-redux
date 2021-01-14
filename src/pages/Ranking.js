import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;

    const rankingPlayers = JSON.parse(localStorage.getItem('ranking'));
    const rankingPlayersOrdened = rankingPlayers.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {rankingPlayersOrdened.map((item, index) => (
          <div key={ index }>
            <h3 data-testid={ `player-name-${index}` }>{item.name}</h3>
            <img src={ item.gravatarEmail } alt="Gravatar" />
            <h3 data-testid={ `player-score-${index}` }>{item.score}</h3>
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Voltar
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Ranking;
