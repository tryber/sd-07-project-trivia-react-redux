import React from 'react';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <h2>Ranking</h2>
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th data-testid="player-name-${index}">Nome</th>
              <th data-testid="player-score-${index}">Pontuação</th>
            </tr>
          </thead>
        </table>
        <button data-testid="btn-go-home" type="button">
          Home
        </button>
      </div>
    );
  }
}

export default Ranking;
