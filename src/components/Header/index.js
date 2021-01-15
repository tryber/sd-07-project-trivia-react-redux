import React from 'react';
import md5 from 'crypto-js/md5';
import './style.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        pname: 'jota',
        assertions: '2',
        score: '33',
        gravaterEmail: 'jtonto',
      },
      // currentQuestionDifficulty: , // Number from 1 to 3 came from the Redux State
    };
    this.renderJogador = this.renderJogador.bind(this);
    // this.renderScore = this.renderScore.bind(this);
    // this.handleScore = this.handleScore.bind(this);
    // this.handleCurrentScore = this.handleCurrentScore.bind(this);
  }
  /*
  handleCurrentScore() {
    const pointsCalcPattern = 10;
    return (pointsCalcPattern + (timer * this.state.currentQuestionDifficulty)); // time came from the couter.
  }

  handleScore() {
    const { score } = this.state; // Check if this typing is correct

    if ('anserClicked' === 'rigthAnswer') { // Info from Redux State
      return (score + this.handleCurrentScore);
    } return score;
  }
  */
  renderJogador() {
    const { player } = this.state;
    const { pname, gravaterEmail } = player;
    const gravatarHash = md5(gravaterEmail);

    return (
      <div className="header-name">
        <img data-testid="header-profile-picture" className="ugly-picture" alt={ player } src={ `https://www.gravatar.com/avatar/${gravatarHash}` } />
        <h2 className="header-label">Jogador: </h2>
        <h2 data-testid="header-player-name">{ pname }</h2>
      </div>
    );
  }

  renderScore() {
    // const { player } = this.state;
    // const { score } = player;
    return (
      <div className="header-score">
        <h2 className="header-label">Pontos: </h2>
        <h2 data-testid="header-score">{ /*this.handleScore*/ }</h2>
      </div>
    );
  }

  render() {
    return (
      <header className="header-section">
        {this.renderJogador()}
        {this.renderScore()}
      </header>
    );
  }
}

export default Header;
