import React from 'react';
import './style.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        pname: '',
        assertions: '',
        score: '',
        gravaterEmail: '',
      },
    };
  }

  renderJogador() {
    const { player } = this.state;
    const { pname, gravaterEmail } = player;
    return (
      <div>
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
      <div>
        <h2 className="header-label">Pontos: </h2>
        <h2>{ score }</h2>
      </div>
    );
  }

  render() {
    return (
      <header className="header">
        {this.renderAvatar()}
        {this.renderScore()}
      </header>
    );
  }
}

export default Header;
