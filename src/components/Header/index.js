import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Header = ({ name, email, score }) => (
  <header>
    <img
      src={ `https://www.gravatar.com/avatar/${md5(email)}` }
      alt={ `Imagem de ${name}` }
      data-testid="header-profile-picture"
    />
    <span data-testid="header-player-name">{name}</span>
    <span data-testid="header-score">{score}</span>
  </header>
);

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.game.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
