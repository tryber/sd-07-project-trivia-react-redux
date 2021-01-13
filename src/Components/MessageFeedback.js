import React, { Component } from 'react';

export default class MessageFeedback extends Component {
  render() {
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    const min = 3;
    const message = assertions < min ? 'Podia ser melhor...' : 'Mandou bem!';
    return <span data-testid="feedback-text">{message}</span>;
  }
}
