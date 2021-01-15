import React from "react";
import { Link } from "react-router-dom";

class Ranking extends React.Component {
  constructor() {
    super();
  }

  // rankingList() {
  //   const ranking = JSON.parse(localStorage.getItem("ranking"));
  //   for (let i = 0; i < ranking.length; i++) {
  //     const { name, score, picture } = ranking[i];
  //     console.log("passei");
  //     return (
  //       // aqui não pode dar o return direto tem que iterar nas li's ainda
  //       <li data-testid="player-name-${index}">
  //         {`Nome: ${name},  `}
  //         {`Pontuação: ${score},   `}
  //         {`foto: ${picture}`}
  //       </li>
  //     );
  //   }
  // }

  render() {
    const ranking = JSON.parse(localStorage.getItem("ranking"));
    const { name, score, picture } = ranking;
    console.log('ranking-4')
    console.log(ranking);
    console.log(name);
    console.log(score);
    console.log(picture);
    const ordenedRanking = ranking.sort((a,b) => (b.score - a.score));

    return (
      <div>
        <h1 data-testid="ranking-title">Tela do ranking</h1>
        <ul>
          {ordenedRanking.map((ranking, index) => (
            <li key={ index }>
              <p data-testid={ `player-name-${index}` }>{`${ranking.name}`}</p>
              <p data-testid={ `player-score-${index}` }>{`${ranking.score}`}</p>
            </li>
          ))}
        </ul>
        <Link data-testid="btn-go-home" to="/">
          Go to Home
        </Link>
      </div>
    );
  }
}

export default Ranking;
