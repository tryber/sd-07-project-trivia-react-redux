import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div>
          <img data-testid="header-profile-picture" />
          <h3 data-testid="header-player-name">Nome</h3>
        </div>
        <h3>Pontos: <span data-testid="header-score">0</span></h3>
      </header>
    );
  }
}

export default Header;
