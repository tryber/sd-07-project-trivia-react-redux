import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  render() {
    const { avatar, userName } = this.props;
    const score = 0;
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
          Pontos:
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
});

Header.propTypes = {
  avatar: PropTypes.string.isRequired,
  userName: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
