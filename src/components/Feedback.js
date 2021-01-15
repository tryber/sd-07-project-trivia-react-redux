import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Question from './Question';
import actions from '../actions';
import Header from './Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.redirectToRanking = this.redirectToRanking.bind(this);
  }

  handleClick() {
    const { resetScoreAction, resetQuestionAction, history } = this.props;
    resetScoreAction();
    resetQuestionAction();
    history.push('/');
  }

  redirectToRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
    let message = '';
    const minimumScore = 3;
    if (assertions < minimumScore) {
      message = 'Podia ser melhor...';
    } else {
      message = 'Mandou bem!';
    }
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">{ message }</span>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Jogar novamente
        </button>
        <span data-testid="feedback-total-score">{ score }</span>
        <span data-testid="feedback-total-question">{ assertions }</span>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectToRanking }
        >
          Ver ranking
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetQuestionAction: () => dispatch(actions.resetQuestion()),
  resetScoreAction: () => dispatch(actions.resetScore()),
});

export default connect(null, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  resetScoreAction: PropTypes.func.isRequired,
  resetQuestionAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
