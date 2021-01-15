import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { resetScore } from '../../redux/actions/gameActions';

class Feedback extends Component {
  constructor() {
    super();
    this.FeedbackMsg = this.FeedbackMsg.bind(this);
    this.rankNewSession = this.rankNewSession.bind(this);
  }

  componentWillUnmount() {
    const { resetSession } = this.props;
    resetSession();
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

  rankNewSession() {
    const { name, score, picture } = this.props;

    const sessionObject = { name, score, picture };

    const chaveAtual = localStorage.getItem('ranking') || '[]';

    const arrayAtual = JSON.parse(chaveAtual);

    const novoArray = [...arrayAtual, sessionObject];

    localStorage.setItem('ranking', JSON.stringify(novoArray));
  }

  render() {
    const { FeedbackMsg } = this;
    const { rightAnswers, score } = this.props;
    const three = 3;
    this.rankNewSession();

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
  resetSession: PropTypes.func.isRequired,
  rightAnswers: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  rightAnswers: state.session.rightAnswers,
  score: state.session.score,
  name: state.user.userName,
  picture: state.user.avatarUrl,
});

const mapDispatchToProps = (dispatch) => ({
  resetSession: () => (dispatch(resetScore())),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
