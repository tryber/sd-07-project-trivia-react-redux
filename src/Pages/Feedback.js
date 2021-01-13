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
          Jogar novamente
        </Link>
      </>
    );
  }
}

export default Feedback;
