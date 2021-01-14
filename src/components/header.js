import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import '../styles/index.scss';

class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;
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
        <span data-testid="header-score">{score}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
  name: state.user.name,
  email: state.user.email,
  score: state.score.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
