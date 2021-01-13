import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { score } = this.props;
    const { name, email } = this.props;
    return (
      <div>
        <h2>Trybe Trivia</h2>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(email)}` }
          alt="avatar"
        />
        <h3 data-testid="header-player-name">
          Nome do Jogador:
          { name }
        </h3>
        <h4 data-testid="header-score">{score}</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  email: state.userReducer.email,
  score: state.gameReducer.statePlayer.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
