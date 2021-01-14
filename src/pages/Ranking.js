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
        picture: ' :-) '
      }
    };
  }

  render() {
    const { name, score, picture } = this.state.ranking;
    
    return (
      <div>
        <p>Tela do ranking</p>
        <ul>
          <li data-testid='player-name-${index}'>{ `Nome: ${name},  ` }{ `Pontuação: ${score},   ` }{ `foto: ${picture}` }</li>
        </ul>
      </div>
    );
  }
}


export default Ranking;
