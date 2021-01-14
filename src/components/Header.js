import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email, Score } = this.props;
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        assertions: 0,
        score: Score,
        gravatarEmail: email,
      } }));
    return (
      <div>
        Header
        <img src={ `https://www.gravatar.com/avatar/${md5(email)}` } data-testid="header-profile-picture" alt="perfilImg" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{Score}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ UserInfo: { name, email }, Score }) => ({
  name, email, Score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  Score: PropTypes.number.isRequired,
};
