import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedBack extends React.Component {
  render() {
    const playerStorage = JSON.parse(localStorage.getItem('state'));
    console.log(playerStorage);
    const three = 3;
    return (
      <div>
        <Header />
        <div className="feedback-container">
          {playerStorage.player.assertions >= three ? (
            <div data-testid="feedback-text">
              <h3>Mandou bem!</h3>
            </div>
          ) : (
            <div data-testid="feedback-text">
              <h2>Podia ser melhor...</h2>
            </div>
          )}
          <div data-testid="feedback-total-score">
            <h4>
              Pontuação final: 
              {playerStorage.player.score}
            </h4>
          </div>
          <div data-testid="feedback-total-question">
            <h5>
              Respostas corretas: 
              {playerStorage.player.assertions}
            </h5>
          </div>
          <Link to="/" data-testid="btn-play-again" className="play-again-button">
            Jogar novamente
          </Link>
        </div>
      </div>
    );
  }
}

export default FeedBack;
