import React, { Component } from 'react';
import { RankingComponent } from '../../components';
import './Ranking.css';

class Ranking extends Component {
  render() {
    return (
      <div className="ranking-page">
        <RankingComponent />
      </div>
    );
  }
}

export default Ranking;
