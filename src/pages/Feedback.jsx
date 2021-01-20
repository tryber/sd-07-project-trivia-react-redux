import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/header';

class Game extends React.Component {
  render() {
    const { wins, score, history } = this.props;
    let message = 'Podia ser melhor...';
    const three = 3;
    if (wins >= three) {
      message = 'Mandou bem!';
    }
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{message}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{wins}</p>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-play-again"
        >
          Jogar novamente
        </button>
        <button
          type="button"
          onClick={ () => history.push('/ranking') }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wins: state.trivia.wins,
  score: state.trivia.score,
});

Game.propTypes = {
  wins: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  history: PropTypes.objectOf.isRequired,
};

export default withRouter(connect(mapStateToProps)(Game));
