import React from 'react';
import { Header } from '../components';

class FeedBack extends React.Component {
  render() {
    return (
      <div>
      <Header />
      <main>
        <h1>Poia ser melhor....</h1>

        <h2>Você acertou ... questões!</h2>
        <h2>Um total de ... pontos</h2>

        <button type="button">Ver ranking</button>
        <button type="button">Jogar novamente</button>
      </main>
      </div>
    )
  }
}

export default FeedBack;
