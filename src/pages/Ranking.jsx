import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import propTypes from 'prop-types';

class Ranking extends Component {
  render() {
    // incluir array.map() para gerar os itens da lista <ul />
    // componente 'RankingItem' criado para renderizar os itens da lista
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul />
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
