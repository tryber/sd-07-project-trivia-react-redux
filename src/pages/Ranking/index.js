import React, { Component } from 'react';
import { Header, Title, RankingItem } from '../../components';
import './style.css';

class Ranking extends Component {
  render() {
    return (
      <div>
        <Header />
        <Title title="Ranking" />
        <RankingItem />
      </div>
    );
  }
}

export default Ranking;
