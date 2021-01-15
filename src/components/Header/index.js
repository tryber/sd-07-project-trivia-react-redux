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
        <div data-testid="header-player-name">
          <p> Nome: </p>
          { name }
        </div>
        <div>
          <p>
            Placar:
          </p>
          <span data-testid="header-score">
            { score }
          </span>
        </div>
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
