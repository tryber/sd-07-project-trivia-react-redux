import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class FeedBackScore extends Component {
  render() {
    const { assertionsProps, scoreProps } = this.props;
    const threeAssertions = 3;
    return (
      <div>
        <p data-testid="feedback-text">
          { assertionsProps >= threeAssertions
            ? 'Mandou bem!'
            : 'Podia ser melhor...'}
        </p>
        <p>Pontuação: </p>
        <p data-testid="feedback-total-score">
          {scoreProps}
        </p>
        <p> Acertos: </p>
        <p data-testid="feedback-total-question">
          {assertionsProps}
        </p>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Jogar Novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  scoreProps: state.player.score,
  assertionsProps: state.player.assertions,
});

FeedBackScore.propTypes = {
  assertions: PropTypes.number.isRequired,
  scoreProps: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedBackScore);
