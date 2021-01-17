import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();
    this.goHome = this.goHome.bind(this);
    this.state = {
    };
  }

  goHome() {
    const { history } = this.props;
    history.push('./');
  }

  render() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    const highToLowRanking = getRanking.sort((a, b) => b.score - a.score);

    /* const x = [
      { score: 20 },
      { score: 21 },
      { score: 30 },
    ];

    const y = x.sort((a, b) => b.score - a.score);
    console.log(y); */

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <table>
          <tbody>
            { highToLowRanking.map((player, index) => (
              <tr
                key={ `${player.name}-${index}` }
              >
                <td>
                  <img
                    src={ player.picture }
                    alt="user Avatar"
                  />
                </td>
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
          </tbody>
        </table>
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
