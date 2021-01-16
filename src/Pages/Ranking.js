import React, { Component } from 'react';
import Header from '../Components/Header';
import GoHome from '../Components/GoHome';

class Ranking extends Component {
  render() {
    return (
      <div>
        <Header />
        <GoHome { ...this.props } />
        <h2 data-testid="ranking-title">
          Ranking
        </h2>
      </div>
    );
  }
}

export default Ranking;
