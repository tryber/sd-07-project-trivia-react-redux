import React from 'react';

class Ranking extends React.Component {
  render() {
    /* README
      Descomentar e salvar pela primeira vez, para ter os dados salvos no LocalStorage
      Após ter os dados salvos comentar novamente as linhas da 8 até 36
      const players = [
        {
            img:'bruno.png',
            name:'Bruno',
            score: 10,
        },
        {
            img:'bela.png',
            name:'Bela',
            score: 20,
        },
        {
            img:'mell.png',
            name:'Mell',
            score: 15,
        },
        {
            img:'lauro.png',
            name:'Lauro',
            score: 5,
        }
      ];

     localStorage.setItem('players', JSON.stringify(players));
      */
    let playersList = [];
    if (localStorage.getItem('players')) {
      playersList = JSON.parse(localStorage.getItem('players'));
    }

    const playerListDescendingOrder = playersList.sort((a, b) => (b.score - a.score));

    return (
      <div>
        <h2>RANKING</h2>
        {/* Índice inicia com 0 */}
        { playerListDescendingOrder.map((player, indice) => (
          <p key={ player.name }>
            <span>
              { player.img }
            </span>
            <span
              data-testid-player-name={ indice }
            >
              { player.name }
            </span>
            <span data-testid-score>{player.score}</span>
          </p>
        ))}
      </div>
    );
  }
}

export default Ranking;
