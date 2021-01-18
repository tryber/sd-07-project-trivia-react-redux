import React from 'react';
import { Link } from 'react-router-dom';
import Header from './componentes/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>
        <h1 data-testid="feedback-text">Podia ser melhor...</h1>
        <h1 data-testid="feedback-text">Mandou bem!</h1>
        <Link to="./ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
