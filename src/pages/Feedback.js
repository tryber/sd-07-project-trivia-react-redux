import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const minAssertions = 3;
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {
            assertions >= minAssertions
              ? 'Mandou bem!'
              : 'Podia ser melhor...'
          }
        </p>
        <h4>Placar Final</h4>
        <p data-testid="feedback-total-score">{score}</p>
        <h4>Perguntas Acertadas</h4>
        <p data-testid="feedback-total-question">{assertions}</p>

        <Link to="/">
          <button data-testid="btn-play-again" type="button">
            Jogar Novamente
          </button>
        </Link>

        <Link to="/ranking">
          <button data-testid="btn-ranking" type="button">
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
