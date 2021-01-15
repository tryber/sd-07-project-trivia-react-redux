import React, { Component } from 'react';
import RankScreen from '../../components/RankScreen';

class RankingPage extends Component {
  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <RankScreen />
      </>
    );
  }
}

export default RankingPage;
