import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { authentication } from '../Redux/actions';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.saveScoreToRankingPage = this.saveScoreToRankingPage.bind(this);
  }

  componentDidMount() {
    const { authenticationDispatch } = this.props;
    authenticationDispatch(false);
    this.saveScoreToRankingPage();
  }

  saveScoreToRankingPage() {
    const { name, score, gravatarImg: picture } = this.props;

    const rankingData = localStorage.getItem('ranking');
    const parsedRankingData = JSON.parse(rankingData);

    const ranking = { name, score, picture };

    if (parsedRankingData === null) {
      return localStorage.setItem('ranking', JSON.stringify([ranking]));
    }

    localStorage.setItem('ranking', JSON.stringify([...parsedRankingData, ranking]));
  }

  feedbackMessage() {
    const { assertions } = this.props;
    const assertionsToWin = 3;
    if (assertions >= assertionsToWin) {
      return <h1 data-testid="feedback-text">Mandou bem!</h1>;
    }
    return <h1 data-testid="feedback-text">Podia ser melhor...</h1>;
  }

  render() {
    const { score, name, gravatarImg, assertions } = this.props;

    return (
      <div>
        { this.feedbackMessage() }
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <img data-testid="header-profile-picture" src={ gravatarImg } alt="profile" />
        <h2 data-testid="header-player-name">{name}</h2>
        <p data-testid="header-score">{score}</p>
        <Link
          to="/ranking"
          data-testid="btn-ranking"
        >
          Ver Ranking
        </Link>

        <Link to="/" data-testid="btn-play-again">
          Jogar novamente
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.gameReducer.score,
  assertions: state.gameReducer.assertions,
  gravatarImg: state.userReducer.user.gravatarImg,
  name: state.userReducer.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  authenticationDispatch: (auth) => dispatch(authentication(auth)),
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  gravatarImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  authenticationDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
