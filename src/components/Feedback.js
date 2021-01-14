import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Question from './Question';
import { Link } from 'react-router-dom';
import actions from '../actions';
import Header from './Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { resetScoreAction, resetQuestionAction } = this.props;
    resetScoreAction();
    resetQuestionAction();
  }

  render() {
    const { score } = this.props;
    let message = '';
    const minimumScore = 3;
    if (score < minimumScore) {
      message = 'Podia ser melhor...';
    } else {
      message = 'Mandou bem!';
    }
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{ message }</p>
        <Link
          to="/"
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          <button type="button">
            Jogar novamente
          </button>
        </Link>
        <Link
          to="/ranking"
          type="button"
          data-testid="btn-ranking"
        >
          <button type="button">
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.gamepage.score,
});

const mapDispatchToProps = (dispatch) => ({
  resetQuestionAction: () => dispatch(actions.resetQuestion()),
  resetScoreAction: () => dispatch(actions.resetScore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  resetScoreAction: PropTypes.func.isRequired,
  resetQuestionAction: PropTypes.func.isRequired,
};
