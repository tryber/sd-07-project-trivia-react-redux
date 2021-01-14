import React, { Component } from 'react';

export default class Score extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
    };
    this.calculateScore = this.calculateScore.bind(this);
  }

  calculateScore(timer, difficulty) {
    const baseScore = 10;
    const multiplierPerDifficulty = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const score = baseScore + (timer * multiplierPerDifficulty[difficulty]);
    return score;
  }

  render() {
    const { score } = this.state;
    return <div>{ score }</div>;
  }
}
