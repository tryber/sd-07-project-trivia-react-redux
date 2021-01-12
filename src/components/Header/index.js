import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    const md5Email = md5(gravatarEmail).toString();
    const gravatar = `https://www.gravatar.com/avatar/${md5Email}`;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ gravatar }
          alt="imagem de avatar"
        />
        <p data-testid="header-player-name">
          Nome:
          { name }
        </p>
        <p data-testid="header-score">
          Placar:
          { score }
        </p>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  score: player.score,
  gravatarEmail: player.gravatarEmail,
});

Header.propTypes = ({
  gravatarEmail: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
});

export default connect(mapStateToProps)(Header);
