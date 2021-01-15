import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <div>
          <Link to="/">
            <button
              data-testid="btn-go-home"
              type="button"
            >
              Voltar Inicio
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
