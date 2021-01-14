import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class PlayGameHeader extends Component {
  render() {
    const { email, username } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email)}` }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{ username }</span>
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

const mapStateToProps = ({ userReducer: { user: { email, username } } }) => ({
  email,
  username,
});

PlayGameHeader.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(PlayGameHeader);
