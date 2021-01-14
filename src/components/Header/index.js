import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { player: { name, gravatarEmail, score } } = this.props;
    const URL_AVATAR = `https://www.gravatar.com/avatar/${md5(gravatarEmail)}`;

    return (
      <div>
        <img
          src={ URL_AVATAR }
          alt="Profile"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">
          {name}
        </h3>
        <h3 data-testid="header-score">
          { score || '0' }
        </h3>
      </div>
    );
  }
}

Header.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,

};

const mapStateToProps = (state) => ({
  player: state.user.player,
});

export default connect(mapStateToProps)(Header);
