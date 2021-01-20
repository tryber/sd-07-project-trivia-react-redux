import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  render() {
    const { avatar, userName, gotScore } = this.props;
    const score = gotScore;
    return (
      <div>
        <img
          src={ avatar }
          alt="User login gravatar"
          data-testid="header-profile-picture"
        />
        <p
          data-testid="header-player-name"
        >
          {userName}
        </p>
        <p
          data-testid="header-score"
        >
          {score}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  avatar: state.user.avatar,
  email: state.user.email,
  userName: state.user.userName,
  gotScore: state.trivia.score,
});

Header.propTypes = {
  avatar: PropTypes.string.isRequired,
  userName: PropTypes.func.isRequired,
  gotScore: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
