import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    return (
      <div>
        Header
        <img src={ `https://www.gravatar.com/avatar/${md5(email)}` } data-testid="header-profile-picture" alt="perfilImg" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

const mapStateToProps = ({ UserInfo: { name, email } }) => ({
  name, email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
