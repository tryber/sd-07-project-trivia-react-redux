import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import './header.css';

class Header extends React.Component {
  render() {
    const { name, email } = this.props;
    const hash = md5(email);
    const urlGravatar = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div>
        <h3>Header</h3>
        <img
          src={ urlGravatar }
          data-testid="header-profile-picture"
          alt="Avatar do Jogador"
        />
        <span data-testid="header-player-name">{ name }</span>
        <span>Pontuação:</span>
        <span data-testid="header-score">0</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
  name: state.user.name,
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
