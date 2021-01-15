import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameHeader extends Component {
  render() {
    const { username, gravatarImg } = this.props;
    return (
      <header className="playGame">
        <div className="img">
          <img
            src={ gravatarImg }
            alt="gravatar"
            data-testid="header-profile-picture"
          />
        </div>
        <div className="userName">
          <span data-testid="header-player-name">{username}</span>
        </div>
        <div className="score">
          <span>Pontuação:</span>
          <span id="score" data-testid="header-score">0</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.userReducer.user.username,
  gravatarImg: state.userReducer.user.gravatarImg,
});

GameHeader.propTypes = {
  username: PropTypes.string.isRequired,
  gravatarImg: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(GameHeader);
