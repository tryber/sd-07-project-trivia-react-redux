import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedBack extends React.Component {
  render() {
    const playerStorage = JSON.parse(localStorage.getItem('state'));
    const three = 3;

    return (
      <div>
        <Header />
        {playerStorage.player.assertions >= three ? (
          <div data-testid="feedback-text">Mandou bem!</div>
        ) : (
          <div data-testid="feedback-text">Podia ser melhor...</div>
        )}
        <div data-testid="feedback-total-score">
          {playerStorage.player.score}
        </div>
        <div data-testid="feedback-total-question">
          {playerStorage.player.assertions}
        </div>
        <Link to="/" data-testid="btn-play-again">
          Jogar novamente
        </Link>
        <Link to="/ranking" data-testid="btn-ranking">
          Ver Ranking
        </Link>
      </div>
    );
  }
}

export default FeedBack;
