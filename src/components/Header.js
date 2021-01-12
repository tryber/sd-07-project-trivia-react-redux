import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.gravatarHash = this.gravatarHash.bind(this);
  }

  gravatarHash() {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail);
    return hash;
  }

  render() {
    const { name, score } = this.props;
    return (
      <div>
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${this.gravatarHash()}` } alt="Avatar" />
      </div>
    );
  }
}

const mapStateToProps = ({ player: { name, gravatarEmail, score } }) => ({
  name,
  gravatarEmail,
  score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
