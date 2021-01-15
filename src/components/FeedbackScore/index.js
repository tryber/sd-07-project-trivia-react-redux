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
        <Link
          data-testid="btn-play-again"
          to="/"
        >
          Jogar Novamente
        </Link>
        <Link
          data-testid="btn-ranking"
          to="/ranking"
        >
          Ver Ranking
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
  assertionsProps: PropTypes.number.isRequired,
  scoreProps: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedBackScore);
