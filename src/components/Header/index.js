import React from 'react';
import './style.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        pname: 'Eduardo',
        assertions: '',
        score: '20',
        gravaterEmail: '',
      },
    };
  }

  renderJogador() {
    const { player } = this.state;
    const { pname, gravaterEmail } = player;
    return (
      <div className="header-name">
        {gravaterEmail}
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
