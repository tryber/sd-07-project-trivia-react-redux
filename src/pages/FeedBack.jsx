import React from 'react';
import Header from '../components/Header';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);

    this.getFeedBackMessage = this.getFeedBackMessage.bind(this);
  }

  getFeedBackMessage() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { assertions } = state.player;
    const three = 3;
    if (assertions < three) return 'Podia ser melhor...';
    if (assertions >= three) return 'Mandou bem!';
  }

  render() {
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">{ this.getFeedBackMessage() }</span>
      </div>
    );
  }
}

export default FeedBack;
