import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    const { assertions } = this.props;
    const bad = <p data-testid="feedback-text">Podia ser melhor...</p>;
    const good = <p data-testid="feedback-text">Mandou bem!</p>;
    const expect = 3;
    if (assertions >= expect) {
      return good;
    }
    return bad;
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        {this.feedbackMessage()}
        <div>
          <p>
            Você acertou
            <span data-testid="feedback-total-question">{assertions}</span>
            <br />
            Vocês somou
            <span data-testid="feedback-total-score">{score}</span>
            pontos!
          </p>
        </div>
        <div>
          <Link to="/ranking">
            <button
              data-testid="btn-ranking"
              type="button"
            >
              Ver Ranking
            </button>
          </Link>
          <Link to="/">
            <button
              data-testid="btn-play-again"
              type="button"
            >
              Jogar Novamente!
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.score.score,
  assertions: state.assertions.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
