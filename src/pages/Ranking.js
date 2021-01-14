import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <p data-testid={ `player-name-${0}` }>Felipe Farina</p>
        <p data-testid={ `player-score-${1}` }>0</p>
        <img src="https://img.ibxk.com.br/2014/06/06/06165614150388.jpg?w=1120&h=420&mode=crop&scale=both" alt="Imagem Gravatar" />
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Início</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
