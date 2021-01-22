import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { score, username, gravatarImg } = this.props;

    return (
      <div>
        <h1 data-testid="feedback-text">feedback</h1>
        <img data-testid="header-profile-picture" src={ gravatarImg } alt="profile" />
        <h2 data-testid="header-player-name">{username}</h2>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.gameReducer.score,
  assertions: state.gameReducer.assertions,
  gravatarImg: state.userReducer.user.gravatarImg,
  username: state.userReducer.user.username,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  gravatarImg: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
