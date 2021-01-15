import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Header';

class Feedback extends Component {
  constructor() {
    super();
    this.FeedbackMsg = this.FeedbackMsg.bind(this);
  }

  FeedbackMsg(rightAnswers) {
    return (
      <p>
        Você acertou
        <span data-testid="feedback-total-question">{rightAnswers}</span>
        perguntas!
      </p>
    );
  }

  render() {
    const { FeedbackMsg } = this;
    const { rightAnswers, score } = this.props;
    const three = 3;

    return (
      <>
        <section data-testid="feedback-text">
          {FeedbackMsg(rightAnswers)}
          {rightAnswers < three ? <h1>Podia ser melhor...</h1> : <h1>Mandou bem!</h1>}
          <h1>
            Você conseguiu
            <span data-testid="feedback-total-score">{score}</span>
            pontos!!!
          </h1>
        </section>
        <Link to="/" data-testid="btn-play-again">
          Jogar novamente
        </Link>
        <Link to="/ranking" data-testid="btn-ranking">
          Ver Ranking
        </Link>
      </>
    );
  }
}

Feedback.propTypes = {
  rightAnswers: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  rightAnswers: state.session.rightAnswers,
  score: state.session.score,
});

export default connect(mapStateToProps)(Feedback);
