import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ gravatarEmail }
          alt="imagem de avatar"
        />
        <p data-testid="header-player-name">
          Nome:
          { name }
        </p>
        Placar:
        <p data-testid="header-score">
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
