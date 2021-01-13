import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking Page</h1>
        <Link to="/" data-testid="btn-go-home">Voltar para Login Page</Link>
      </div>
    );
  }
}

export default Ranking;
