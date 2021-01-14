import React from "react";

class Ranking extends React.Component {
  constructor() {
    super();

    // A chave state deve conter a seguinte estrutura:
    // player: {
    //     name,
    //     assertions,
    //     score,
    //     gravatarEmail
    // }

    //     A chave ranking deve conter a seguinte estrutura:
    // [
    //   { name: nome-da-pessoa, score: 10, picture: url-da-foto-no-gravatar }
    // ]

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

  render() {
    const { name, score, picture, index } = this.state.ranking;
    
    return (
      <div>
        <h1 data-testid='ranking-title'>Tela do ranking</h1>
        <ul>
          <li data-testid={`player-name-${index}`}>{ `Nome: ${name},  ` }{ `Pontuação: ${score},   ` }{ `foto: ${picture}` }</li>
        </ul>
      </div>
    );
  }
}


export default Ranking;
