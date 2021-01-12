import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.gravatarHash = this.gravatarHash.bind(this);
  }

  gravatarHash() {
    const { playerProfile } = this.props;
    const { player } = playerProfile;
    return md5(player.gravatarEmail);
  }

  render() {
    const { playerProfile } = this.props;
    const { player } = playerProfile;
    console.log(player);

    return (
      <header>
        <div>
          <img
            src={ `https://www.gravatar.com/avatar/${this.gravatarHash()}` }
            data-testid="header-profile-picture"
            alt={ `https://www.gravatar.com/avatar/${this.gravatarHash()}` }
          />
        </div>
        <div>
          <h2 data-testid="header-player-name">
            {player.name}
          </h2>
        </div>
        <div>
          <h3 data-testid="header-score">
            {player.score}
          </h3>
        </div>
      </header>
    );
  }
}

export default Header;

Header.propTypes = {
  playerProfile: PropTypes.shape({
    player: PropTypes.shape({
      gravatarEmail: PropTypes.string,
      name: PropTypes.string,
      score: PropTypes.number,
    }),
  }).isRequired,
};
