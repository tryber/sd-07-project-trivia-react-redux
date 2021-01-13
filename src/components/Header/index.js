import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { avatar, user, score } = this.props;

    return (
      <>
        <img src={ avatar } alt="avatar" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{user}</span>
        <span data-testid="header-score">{score}</span>
      </>
    );
  }
}
Header.propTypes = {
  avatar: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    avatar: state.user.avatarUrl,
    user: state.user.userName,
    score: state.session.score,
  };
};

export default connect(mapStateToProps)(Header);
