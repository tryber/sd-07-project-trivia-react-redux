import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  goHome() {
    const { history } = this.props;
    history.push('./');
  }

  render() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { getRanking.map((player, index) => (
          <tr
            key={ `${player.name}-${index}` }
          >
            <td>{ player.picture }</td>
            <td
              data-testid={ `player-name-${index}` }
            >
              { player.name }
            </td>
            <td
              data-testid={ `player-score-${index}` }
            >
              { player.score }
            </td>
          </tr>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ (event) => this.goHome(event) }
        >
          Voltar
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
