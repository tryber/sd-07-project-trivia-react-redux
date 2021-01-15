import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import addScore from '../store/ducks/Score/actions';

class FeedBack extends Component {
  constructor() {
    super();
    this.handleRedirectHome = this.handleRedirectHome.bind(this);
    this.handleRedirectRanking = this.handleRedirectRanking.bind(this);
  }

  handleRedirectHome() {
    const { history, actionScore } = this.props;
    actionScore(0);
    history.push('/');
  }

  handleRedirectRanking() {
    const { history, actionScore } = this.props;
    actionScore(0);
    history.push('/ranking');
  }

  render() {
    const { assertions } = this.props;
    const three = 3;
    console.log('quest', assertions);
    return (
      <div data-testid="feedback-text">
        <Header />
        {assertions < three ? (
          <p ata-testid="feedback-text">Podia ser melhor...</p>
        ) : (
          <p ata-testid="feedback-text">Mandou bem!</p>
        )}
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleRedirectHome }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleRedirectRanking }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.QuestionRequest.assertions,
});
const mapDispatchToProps = {

  actionScore: addScore,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);

FeedBack.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  assertions: PropTypes.string.isRequired,
  actionScore: PropTypes.func.isRequired,
};
