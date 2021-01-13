import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MessageFeedback from '../Components/MessageFeedback';
import ScoreFeedback from '../Components/ScoreFeedback';

class Feedback extends React.Component {
  componentDidMount() {
    const { statePlayer: { nome, score, gravatarEmail } } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const playerActual = {
      name: nome,
      score,
      picture: gravatarEmail,
    };
    ranking.push(playerActual);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    return (
      <>
        <h1>Tela de Feedback</h1>
        <Header />
        <MessageFeedback />
        <ScoreFeedback />
        <Link to="/" data-testid="btn-play-again">
          <button type="button">
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = ({ gameReducer }) => ({
  statePlayer: gameReducer.statePlayer,
});

Feedback.propTypes = {
  statePlayer: PropTypes.objectOf(
    PropTypes.shape({
      nome: PropTypes.string,
      score: PropTypes.number,
      gravatarEmail: PropTypes.string,
    }),
  ).isRequired,
};

export default connect(mapStateToProps)(Feedback);
