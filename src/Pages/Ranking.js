import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RankingTable from '../Components/RankingTable';

export default class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Tela Ranking</h1>
        <RankingTable />
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Home
          </button>
        </Link>
      </div>
    );
  }
}
