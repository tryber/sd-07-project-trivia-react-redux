import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.redirectForRanking = this.redirectForRanking.bind(this);
    this.redirectForPlayAgain = this.redirectForPlayAgain.bind(this);
  }

  redirectForRanking(event) {
    event.preventDefault();
    const { history } = this.props;
    if (history) history.push('/ranking');
  }

  redirectForPlayAgain(event) {
    event.preventDefault();
    const { history } = this.props;
    if (history) history.push('/');
  }

  render() {
    const { assertions, score } = this.props;
    const num = 3;
    return (
      <div>
        <Header />
        <div>
          {assertions < num && (
            <p data-testid="feedback-text">Podia ser melhor...</p>
          )}
          {assertions >= num && (
            <p data-testid="feedback-text">Mandou bem!</p>
          )}
        </div>
        <div>
          <p data-testid="feedback-total-score">
            { score }
          </p>
          <p data-testid="feedback-total-question">
            { assertions }
          </p>
        </div>
        <div>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.redirectForPlayAgain }
          >
            Jogar novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.redirectForRanking }
          >
            Ver Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

export default connect(mapStateToProps)(Feedback);
