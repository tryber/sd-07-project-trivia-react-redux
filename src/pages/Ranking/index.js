import React, { Component } from 'react';
import { Header, Question, RankingItem } from '../../components';
import './style.css';

class Ranking extends Component {
  render() {
    return (
      <div>
        <Header />
        <Question />
        <RankingItem />
      </div>
    );
  }
}

export default Ranking;
