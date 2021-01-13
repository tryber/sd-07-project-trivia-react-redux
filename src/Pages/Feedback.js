import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import MessageFeedback from '../Components/MessageFeedback';
import ScoreFeedback from '../Components/ScoreFeedback';

class Feedback extends React.Component {
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

export default Feedback;
