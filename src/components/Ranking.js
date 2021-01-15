import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  render() {
    let playersList = [];
    if (localStorage.getItem('players')) {
      playersList = JSON.parse(localStorage.getItem('players'));
    }

    const playerListDescendingOrder = playersList.sort(
      (a, b) => b.score - a.score
    );

    return (
      <div>
        <h2>RANKING</h2>
        {playerListDescendingOrder.map((player, indice) => (
          <p key={player.name}>
            <span>{player.img}</span>
            <span data-testid={`player-name-${indice}`}>{player.name}</span>
            <span data-testid={`player-score-${indice}`}>{player.score}</span>
          </p>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.results,
  token: state.player.token,
});

export default connect(mapStateToProps)(Ranking);
