import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import rankingLocalStorage from '../services/localStorageFunctions';
import './Feedback.css';

class Feedback extends Component {
  componentDidMount() {
    const { name, score, picture } = this.props;
    const atualPlayer = { name, score, picture };
    const rankingArray = rankingLocalStorage();
    rankingArray.push(atualPlayer);

    localStorage.setItem('ranking', JSON.stringify(rankingArray));
  }

  render() {
    const minAssertions = 3;
    const { assertions, score } = this.props;
    return (
      <div className="feedback-page">
        <p data-testid="feedback-text" className="feedback-text">
          {
            assertions >= minAssertions
              ? 'Well done!'
              : 'Try again'
          }
        </p>
        <div className="score-container">
          <p>
            Final Score:
            {' '}
            <span
              data-testid="feedback-total-score"
              className="final-score"
            >
              {score}
            </span>
          </p>
          <p>
            Correct Answers:
            {' '}
            <span
              data-testid="feedback-total-question"
              className="correct-answers"
            >
              {assertions}
            </span>
          </p>
        </div>
        <div className="feedback-links-container">
          <Link to="/">
            <button
              data-testid="btn-play-again"
              type="button"
              className="feedback-buttons"
            >
              Play Again
            </button>
          </Link>

          <Link to="/ranking">
            <button
              data-testid="btn-ranking"
              type="button"
              className="feedback-buttons"
            >
              Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  picture: state.player.picture,
});

export default connect(mapStateToProps)(Feedback);
