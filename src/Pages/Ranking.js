import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const playersList = JSON.parse(localStorage.getItem('ranking'));
    console.log(playersList);

    const playerListDescendingOrder = playersList.sort(
      (a, b) => b.score - a.score,
    );

    localStorage.setItem('ranking', JSON.stringify(playerListDescendingOrder));

    return (
      <div>
        <h2 data-testid="ranking-title">RANKING</h2>
        {playerListDescendingOrder.map((player, indice) => (
          <p key={ player.name }>
            <img
              alt="user avatar"
              src={ player.picture }
            />
            <span data-testid={ `player-name-${indice}` }>{ player.name }</span>
            <span data-testid={ `player-score-${indice}` }>{ player.score }</span>
          </p>
        ))}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Home
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.results,
  token: state.player.token,
});

export default connect(mapStateToProps)(Ranking);
