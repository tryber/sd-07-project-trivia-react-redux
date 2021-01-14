import React from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends React.Component {
  render() {
    return (
      <div data-testid="ranking-title">
        <h1>Ranking</h1>
        <Link data-testid="btn-go-home" to="/">Go to Home</Link>
      </div>
    );
  }
}
