import React, { Component } from 'react';
import '../css/Feedback.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GameHeader from '../components/GameHeader';

class Feedback extends Component {
  constructor() {
    super();
    this.goToLogin = this.goToLogin.bind(this);
    this.goToRaking = this.goToRaking.bind(this);
  }

  goToLogin() {
    const { history } = this.props;
    history.push('/');
  }

  goToRaking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { getScore, getCorrectCount } = this.props;
    const three = 3;
    return (
      <div>
        <GameHeader />
        <div className="feedback-container">
          <h1>FEEDBACK SCREEN</h1>
          <div>
            { getCorrectCount < three
              ? <h2 data-testid="feedback-text">Podia ser melhor...</h2>
              : <h2 data-testid="feedback-text">Mandou bem!</h2> }
          </div>
          <div>
            <p data-testid="feedback-total-question">{ getCorrectCount }</p>
            <p data-testid="feedback-total-score">{ getScore }</p>
          </div>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.goToRaking }
          >
            Ver ranking
          </button>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.goToLogin }
          >
            Jogar novamente
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ scoreReducer }) => ({
  getCorrectCount: scoreReducer.correctAnswers,
  getScore: scoreReducer.score,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getCorrectCount: PropTypes.number.isRequired,
  getScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
