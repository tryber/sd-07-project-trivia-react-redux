import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>TRIVIA</h1>
        <img src="https://pbs.twimg.com/profile_images/1042181136720453632/yzc4rno0_400x400.jpg" alt="profile-player" data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">Player Name</h3>
        <span data-testid="header-score">00</span>
      </div>
    );
  }
}

export default Header;
