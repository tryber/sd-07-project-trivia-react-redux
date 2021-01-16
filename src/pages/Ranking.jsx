import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import propTypes from 'prop-types';
import RankingItem from '../components/RankingItem';

class Ranking extends Component {
  constructor() {
    super()

    this.renderRanking = this.renderRanking.bind(this);
  }

  renderRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return ranking.map((player, index) => (
      <RankingItem
        key={ player.picture }
        player={ player }
        index={ index }
      />))
  }

  render() {
    // incluir array.map() para gerar os itens da lista <ul />
    // componente 'RankingItem' criado para renderizar os itens da lista
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { this.renderRanking() }
        </ul>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Jogar novamente!
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
