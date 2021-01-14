import React from "react";
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      player: {
        name: '',
        assertions: '',
        score: '',
        gravatarEmail: '',
      },
      ranking: {
        name: 'João', 
        score: '10', 
        picture: ' :-) ',
        index: ''
      }
    };
  }

  rankingList() {
    const { player: { name, assertions, score, gravatarEmail } } = JSON.parse(localStorage.getItem('state'));
    const { index } = this.state.ranking;
    return (
    <li data-testid={`player-name-${index}`}>
      { `Nome: ${name},  ` }
      { `Pontuação: ${score},   ` }
      {`Acertos: ${assertions},   `}
      { `foto: ${gravatarEmail}` }
    </li>
    );
  }

  render() {
    return (
      <div>
        <h1 data-testid='ranking-title'>Tela do ranking</h1>
        <ul>
          { this.rankingList() }
        </ul>
        <Link data-testid="btn-go-home" to="/">Go to Home</Link>
      </div>
    );
  }
}


export default Ranking;
