import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoRanking from '../Components/GoRanking';
import Header from '../Components/Header';
import PlayAgain from '../Components/PlayAgain';

class Feedback extends React.Component {
  constructor() {
    super();
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    const { correctAnswers } = this.props;
    const message0 = 'Não acertou nenhuma pergunta';
    const message1 = 'Podia ser melhor...';
    const message2 = 'Mandou bem!';
    const minScore = 3;
    if (correctAnswers === 0) {
      return message0;
    }
    if (correctAnswers >= minScore) {
      return message2;
    }
    return message1;
  }

  render() {
    const { correctAnswers, score } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{this.feedbackMessage()}</p>
        <PlayAgain { ...this.props } />
        <GoRanking { ...this.props } />
        <p>Total de acertos:</p>
        <p data-testid="feedback-total-question">
          {correctAnswers}
        </p>
        <p>Total de pontos:</p>
        <p data-testid="feedback-total-score">{score}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  correctAnswers: state.score.correctAnswers,
  score: state.score.score,
});

Feedback.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);

// const playerObject = JSON.parse(localStorage.getItem('state'));
// const score = playerObject.player.score
