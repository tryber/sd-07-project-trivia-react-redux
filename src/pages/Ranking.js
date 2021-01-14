import React from "react";
import { Link } from "react-router-dom";

class Ranking extends React.Component {
  constructor() {
    super();
  }

  rankingList() {
    const ranking = JSON.parse(
      localStorage.getItem("ranking")
    );
    for (let i = 0; i<ranking.length; i++) { 
    const { name, score, picture } = ranking[i];
    console.log('passei')
    <li data-testid="player-name-${index}">
        {`Nome: ${name},  `}
        {`Pontuação: ${score},   `}
        {`foto: ${picture}`}
    </li>
    } 
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Tela do ranking</h1>
        <ul>{this.rankingList()}</ul>
        <Link data-testid="btn-go-home" to="/">
          Go to Home
        </Link>
      </div>
    );
  }
}

export default Ranking;
