import React, { Component } from 'react';

export default class MessageFeedback extends Component {
  render() {
    const { player: { assertions }, player: { score } } = JSON.parse(
      localStorage.getItem('state'),
    );
    return (
      <div>
        <h1 data-testid="feedback-total-score">{ score }</h1>
        <h1 data-testid="feedback-total-question">{ assertions }</h1>
      </div>
    );
  }
}
