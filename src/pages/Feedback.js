import React from 'react';
import { Header } from '../components';

class FeedBack extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          <h1 data-testid="feedback-text">Poia ser melhor....</h1>

          <h2 data-testid="feedback-total-question">Você acertou ... questões!</h2>
          <h2 data-testid="feedback-total-score">Um total de ... pontos</h2>

          <button data-testid="btn-ranking" type="button">Ver ranking</button>
          <button data-testid="btn-play-again" type="button">Jogar novamente</button>
        </main>
      </div>
    );
  }
}

export default FeedBack;
