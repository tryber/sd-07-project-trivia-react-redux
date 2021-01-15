import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header } from '../../components';

class Feedback extends Component {
  feedbackMessage() {
    const { assertions, score } = this.props;
    const minScore = 3;
    if (assertions < minScore) {
      return (
        <>
          <h2 data-testid="feedback-text">Podia ser melhor...</h2>
          <span data-testid="feedback-total-score">{score}</span>
          <h2 data-testid="feedback-total-question">{assertions}</h2>
        </>
      );
    }
    return (
      <>
        <h2 data-testid="feedback-text">Mandou bem!</h2>
        <span data-testid="feedback-total-score">{score}</span>
        <h2 data-testid="feedback-total-question">{assertions}</h2>
      </>
    );
  }

  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <h1>Tela de Feedback</h1>
        { this.feedbackMessage() }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  assertions: state.game.assertions,
  score: state.game.score,
});
export default connect(mapStateToProps)(Feedback);
Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
