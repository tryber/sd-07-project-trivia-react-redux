import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gravatarAPI } from '../servicesAPI';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    return (
      <div>
        <header className="header">
          <div className="user-infos">
            <img
              alt="profile picture"
              data-testid="header-profile-picture"
              src={ gravatarAPI(gravatarEmail) }
            />
            <p data-testid="header-player-name">{ name }</p>
            <span data-testid="header-score">Score: { score }</span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
