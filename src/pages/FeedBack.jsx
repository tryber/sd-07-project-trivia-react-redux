import React from 'react';
import Header from '../components/Header';

class FeedBack extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="feedback-text">Feedback Page</div>
      </div>
    );
  }
}

export default FeedBack;
