import React from 'react';
import md5 from 'crypto-js/md5';

class RankingTable extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const menosUm = -1;
    function compareScore(a, b) {
      if (a.score > b.score) return menosUm;
      if (a.score < b.score) return 1;
      return 0;
    }
    ranking.sort(compareScore);
    console.log(ranking);
    return (
      <>
        <h1>Tabela de Ranking</h1>
        {ranking.map((match, index) => {
          const datatestidName = `player-name-${index}`;
          const datatestidScore = `player-score-${index}`;
          return (
            <ul key={ index }>
              <li>
                <img src={ `https://www.gravatar.com/avatar/${md5(match.picture)}` } alt="" />
              </li>
              <li data-testid={ datatestidName }>{match.name}</li>
              <li data-testid={ datatestidScore }>{match.score}</li>
            </ul>
          );
        })}
      </>
    );
  }
}

export default RankingTable;
