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
        score: '20',
        gravaterEmail: 'j.vitoroflores@gmail.com',
      },
    };
  }

  renderJogador() {
    const { player } = this.state;
    const { pname, gravaterEmail } = player;
    const gravatarHash = md5(gravaterEmail);
    console.log(gravatarHash);
    return (
      <div className="header-name">
        <img className="ugly-picture" alt={ player } src={ `https://www.gravatar.com/avatar/${gravatarHash}` } />
        <h2 className="header-label">Jogador: </h2>
        <h2>{ pname }</h2>
      </div>
    );
  }

  renderScore() {
    const { player } = this.state;
    const { score } = player;
    return (
      <div className="header-score">
        <h2 className="header-label">Pontos: </h2>
        <h2>{ score }</h2>
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
