import React from 'react';
import Header from '../Components/Header';

export default class Feedback extends React.Component {
  constructor() {
    super();
    this.setState = {
      score: 0,
    };
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    const { score } = this.state;
    const message1 = 'Podia ser melhor...';
    const message2 = 'Mandou bem!';
    const minScore = 3;
    return (score >= minScore) ? message2 : message1;
  }

  render() {
    return (
      <div>
        <Header>
          <p data-testid="feedback-text">{this.feedbackMessage()}</p>
        </Header>
      </div>
    );
  }
}
