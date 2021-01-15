import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GameHeader from '../components/GameHeader';

class Feedback extends Component {
  render() {
    const { getScore, getCorrectCount } = this.props;
    const three = 3;
    return (
      <div>
        <GameHeader />
        <div data-testid="feedback-test">
          { correctCount < three ? <h2>Podia ser melhor</h2> : <h2>Mandou bem!</h2> }
        </div>
        <div>
          <p data-testid="feedback-total-question">{ getCorrectCount }</p>
          <p data-testid="feedback-total-score">{ getScore }</p>
        </div>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="ranking-title"
          >
            RANKING
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            JOGAR NOVAMENTE
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ gameReducer, scoreReducer }) => ({
  getCorrectCount: gameReducer.correctCount,
  getScore: scoreReducer.score,
});

Feedback.propTypes = {
  getCorrectCount: PropTypes.number.isRequired,
  getScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
