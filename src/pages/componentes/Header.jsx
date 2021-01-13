import React from 'react';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    return (
      <header data-testid="">
        <img data-testid="header-profile-picture" src="" alt="" />
        <h3 data-testid="header-player-name"></h3>
        <h3 data-testid="header-score"></h3>
      </header>
    );
  }
}

export default Header;
