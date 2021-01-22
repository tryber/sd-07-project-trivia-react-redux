import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  feedbackMessage() {
    const { assertions } = this.props;
    const assertionsToWin = 3;
    if (assertions >= assertionsToWin) {
      return <h1 data-testid="feedback-text">Mandou bem!</h1>;
    }
    return <h1 data-testid="feedback-text">Podia ser melhor...</h1>;
  }

  render() {
    const { score, username, gravatarImg, assertions } = this.props;

    return (
      <div>
        { this.feedbackMessage() }
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
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
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
