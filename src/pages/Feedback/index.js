import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header } from '../../components';

class Feedback extends Component {
  constructor() {
    super();

    this.clickPlayAgain = this.clickPlayAgain.bind(this);
    this.clickRanking = this.clickRanking.bind(this);
  }

  clickPlayAgain() {
    const { history } = this.props;
    history.push('/');
  }

  clickRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const RULE_ASSERTIONS = 3;
    const { assertions, score } = this.props;
    const message = assertions >= RULE_ASSERTIONS ? 'Mandou bem!' : 'Podia ser melhor...';

    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">{message}</h1>
        <h2>
          {'Você acertou '}
          <span data-testid="feedback-total-question">{assertions || '0'}</span>
          {' questões! '}
        </h2>
        <h2>
          {'Um total de '}
          <span data-testid="feedback-total-score">{score || '0'}</span>
          {' pontos'}
        </h2>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.clickPlayAgain() }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => this.clickRanking() }
        >
          Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.user.player.assertions,
  score: state.user.player.score,
});

export default connect(mapStateToProps)(Feedback);
